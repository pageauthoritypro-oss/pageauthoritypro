import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Box,
  Button,
  Card,
  Container,
  Dialog,
  Flex,
  Heading,
  Select,
  Spinner,
  Stack,
  Text,
  TextInput,
  Badge,
  Tooltip,
} from '@sanity/ui';
import { CloseIcon, EnvelopeIcon, SearchIcon, TrashIcon } from '@sanity/icons';

// ─── Types ────────────────────────────────────────────────────────────────────

interface FieldEntry {
  name: string;
  label: string;
  value: string;
}

interface Submission {
  id: string;
  fields: FieldEntry[];
  ip: string | null;
  userAgent: string | null;
  createdAt: string;
}

interface ApiResponse {
  submissions: Submission[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  error?: string;
}

type DatePreset = 'all' | 'today' | '7days' | '30days' | 'month' | 'custom';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function getFieldValue(fields: FieldEntry[], key: string) {
  return fields.find((f) => f.name === key)?.value ?? '—';
}

const STUDIO_API_HEADERS: HeadersInit = {
  'x-studio-secret': process.env.NEXT_PUBLIC_STUDIO_API_SECRET ?? '',
};

// Buckets submissions into relative date groups for display, mirroring a
// typical inbox layout (Today / Yesterday / This Week / This Month / Older).
const GROUP_ORDER = ['Today', 'Yesterday', 'This Week', 'This Month', 'Older'] as const;

function getDateGroupLabel(iso: string): (typeof GROUP_ORDER)[number] {
  const date = new Date(iso);
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfYesterday = new Date(startOfToday);
  startOfYesterday.setDate(startOfYesterday.getDate() - 1);
  const startOfWeek = new Date(startOfToday);
  startOfWeek.setDate(startOfWeek.getDate() - 7);
  const startOfMonth = new Date(startOfToday);
  startOfMonth.setDate(startOfMonth.getDate() - 30);

  if (date >= startOfToday) return 'Today';
  if (date >= startOfYesterday) return 'Yesterday';
  if (date >= startOfWeek) return 'This Week';
  if (date >= startOfMonth) return 'This Month';
  return 'Older';
}

function groupSubmissions(submissions: Submission[]) {
  const map = new Map<string, Submission[]>();
  for (const submission of submissions) {
    const label = getDateGroupLabel(submission.createdAt);
    if (!map.has(label)) map.set(label, []);
    map.get(label)!.push(submission);
  }
  return GROUP_ORDER.filter((label) => map.has(label)).map((label) => ({
    label,
    items: map.get(label)!,
  }));
}

// Resolves a date-preset selection into ISO from/to bounds for the API query.
function getPresetRange(preset: DatePreset, customFrom: string, customTo: string): { from?: string; to?: string } {
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  switch (preset) {
    case 'today':
      return { from: startOfToday.toISOString() };
    case '7days': {
      const from = new Date(startOfToday);
      from.setDate(from.getDate() - 6);
      return { from: from.toISOString() };
    }
    case '30days': {
      const from = new Date(startOfToday);
      from.setDate(from.getDate() - 29);
      return { from: from.toISOString() };
    }
    case 'month':
      return { from: new Date(now.getFullYear(), now.getMonth(), 1).toISOString() };
    case 'custom':
      return {
        from: customFrom ? new Date(`${customFrom}T00:00:00`).toISOString() : undefined,
        to: customTo ? new Date(`${customTo}T23:59:59`).toISOString() : undefined,
      };
    default:
      return {};
  }
}

// ─── Drawer ───────────────────────────────────────────────────────────────────

const DRAWER_WIDTH = 480;

function SubmissionDrawer({
  submission,
  onClose,
  onDeleteRequest,
}: {
  submission: Submission | null;
  onClose: () => void;
  onDeleteRequest: (id: string) => void;
}) {
  const [visible, setVisible] = useState(false);
  const prevId = useRef<string | null>(null);

  // Trigger slide-in when a submission is set
  useEffect(() => {
    let frameId: number;
    if (submission) {
      prevId.current = submission.id;
      frameId = requestAnimationFrame(() => setVisible(true));
    } else {
      frameId = requestAnimationFrame(() => setVisible(false));
    }
    return () => cancelAnimationFrame(frameId);
  }, [submission]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.35)',
          zIndex: 9998,
          opacity: visible && submission ? 1 : 0,
          pointerEvents: visible && submission ? 'auto' : 'none',
          transition: 'opacity 0.25s ease',
        }}
      />

      {/* Drawer panel */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: DRAWER_WIDTH,
          maxWidth: '100vw',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          background: 'var(--card-bg-color)',
          boxShadow: '-4px 0 24px rgba(0,0,0,0.18)',
          transform: visible && submission ? 'translateX(0)' : `translateX(${DRAWER_WIDTH}px)`,
          transition: 'transform 0.28s cubic-bezier(0.4,0,0.2,1)',
          pointerEvents: submission ? 'auto' : 'none',
        }}
      >
        {submission && (
          <>
            {/* Drawer header */}
            <Flex
              align="center"
              justify="space-between"
              padding={4}
              style={{
                flexShrink: 0,
              }}
            >
              <Stack space={1}>
                <Text size={1} weight="semibold">
                  {getFieldValue(submission.fields, 'fullName')}
                </Text>
                <Text size={1} muted>
                  {formatDate(submission.createdAt)}
                </Text>
              </Stack>

              <Flex gap={2}>
                <Tooltip content={<Text size={1}>Delete submission</Text>} placement="bottom">
                  <Button
                    icon={TrashIcon}
                    mode="ghost"
                    tone="critical"
                    padding={2}
                    onClick={() => onDeleteRequest(submission.id)}
                    style={{ cursor: 'pointer' }}
                  />
                </Tooltip>
                <Button
                  icon={CloseIcon}
                  mode="ghost"
                  padding={2}
                  onClick={onClose}
                  style={{ cursor: 'pointer' }}
                />
              </Flex>
            </Flex>

            {/* Drawer body */}
            <Box
              padding={4}
              style={{ overflowY: 'auto', flex: 1 }}
            >
              <Stack space={4}>
                {/* Metadata */}
                <Flex gap={2} wrap="wrap">
                  <Badge tone="primary" padding={2} radius={2}>
                    <Text size={1}>{formatDate(submission.createdAt)}</Text>
                  </Badge>
                  {submission.ip && (
                    <Badge tone="default" padding={2} radius={2}>
                      <Text size={1}>IP: {submission.ip}</Text>
                    </Badge>
                  )}
                </Flex>

                {/* Field values */}
                <Stack space={3}>
                  {submission.fields.map((field) => (
                    <Card key={field.name} padding={3} radius={2} tone="transparent" border>
                      <Stack space={2}>
                        <Text
                          size={0}
                          weight="semibold"
                          muted
                          style={{ textTransform: 'uppercase', letterSpacing: '0.08em' }}
                        >
                          {field.label || field.name}
                        </Text>
                        <Text size={2} style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                          {field.value || '—'}
                        </Text>
                      </Stack>
                    </Card>
                  ))}
                </Stack>

                {/* User Agent */}
                {submission.userAgent && (
                  <Card padding={3} radius={2} tone="caution">
                    <Stack space={2}>
                      <Text size={0} weight="semibold" muted>
                        USER AGENT
                      </Text>
                      <Text size={0} muted style={{ wordBreak: 'break-all' }}>
                        {submission.userAgent}
                      </Text>
                    </Stack>
                  </Card>
                )}
              </Stack>
            </Box>
          </>
        )}
      </div>
    </>
  );
}

// ─── Delete Confirm Dialog ─────────────────────────────────────────────────────

function DeleteConfirmDialog({
  onConfirm,
  onCancel,
  isDeleting,
}: {
  onConfirm: () => void;
  onCancel: () => void;
  isDeleting: boolean;
}) {
  return (
    <Dialog
      id="delete-confirm-dialog"
      header="Delete submission?"
      onClose={onCancel}
      width={0}
      zOffset={10000}
      style={{

        transition: 'opacity 0.25s ease',
      }}
    >
      <Box padding={4}>
        <Stack space={4}>
          <Text size={2}>
            This will permanently delete the submission. This action cannot be undone.
          </Text>
          <Flex gap={3} justify="flex-end">
            <Button
              text="Cancel"
              mode="ghost"
              onClick={onCancel}
              disabled={isDeleting}
              style={{ cursor: 'pointer' }}
            />
            <Button
              text={isDeleting ? 'Deleting…' : 'Delete'}
              tone="critical"
              onClick={onConfirm}
              disabled={isDeleting}
              style={{ cursor: 'pointer' }}
            />
          </Flex>
        </Stack>
      </Box>
    </Dialog>
  );
}

// ─── Row ──────────────────────────────────────────────────────────────────────

function SubmissionRow({
  submission,
  isSelected,
  onClick,
  onDeleteRequest,
}: {
  submission: Submission;
  isSelected: boolean;
  onClick: () => void;
  onDeleteRequest: (e: React.MouseEvent) => void;
}) {
  const name = getFieldValue(submission.fields, 'fullName');
  const email = getFieldValue(submission.fields, 'email');

  return (
    <Card
      padding={3}
      radius={2}
      shadow={isSelected ? 2 : 1}
      tone={isSelected ? 'primary' : 'default'}
      style={{ cursor: 'pointer', transition: 'box-shadow 0.15s, background 0.15s' }}
      onClick={onClick}
    >
      <Flex align="center" gap={3}>
        {/* Icon */}
        <Box
          padding={2}
          style={{
            background: isSelected
              ? 'var(--card-badge-primary-bg-color, #dbeafe)'
              : 'var(--card-badge-default-bg-color, #e8f0fe)',
            borderRadius: '50%',
            flexShrink: 0,
          }}
        >
          <Text
            size={2}
            style={{
              color: isSelected
                ? 'var(--card-badge-primary-fg-color, #1d4ed8)'
                : 'var(--card-badge-default-fg-color, #2563eb)',
            }}
          >
            <EnvelopeIcon />
          </Text>
        </Box>

        {/* Name + email */}
        <Stack space={1} flex={1} style={{ minWidth: 0 }}>
          <Text
            size={2}
            weight="semibold"
            style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
          >
            {name}
          </Text>
          <Text
            size={1}
            muted
            style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
          >
            {email}
          </Text>
        </Stack>

        {/* Date + delete */}
        <Flex align="center" gap={2} style={{ flexShrink: 0 }}>
          <Text size={0} muted>
            {formatDate(submission.createdAt)}
          </Text>
          <Tooltip content={<Text size={1}>Delete</Text>} placement="top">
            <Button
              icon={TrashIcon}
              mode="ghost"
              tone="critical"
              padding={2}
              onClick={onDeleteRequest}
              style={{ cursor: 'pointer' }}
            />
          </Tooltip>
        </Flex>
      </Flex>
    </Card>
  );
}

// ─── Filter Bar ────────────────────────────────────────────────────────────────

function FilterBar({
  searchInput,
  onSearchChange,
  datePreset,
  onDatePresetChange,
  customFrom,
  customTo,
  onCustomFromChange,
  onCustomToChange,
  onClear,
  hasActiveFilters,
  isLoading,
}: {
  searchInput: string;
  onSearchChange: (value: string) => void;
  datePreset: DatePreset;
  onDatePresetChange: (value: DatePreset) => void;
  customFrom: string;
  customTo: string;
  onCustomFromChange: (value: string) => void;
  onCustomToChange: (value: string) => void;
  onClear: () => void;
  hasActiveFilters: boolean;
  isLoading: boolean;
}) {
  return (
    <Card padding={3} radius={2} tone="transparent" border style={{ opacity: isLoading ? 0.7 : 1, transition: 'opacity 0.2s' }}>
      <Flex gap={3} wrap="wrap" align="center" style={{ pointerEvents: isLoading ? 'none' : 'auto' }}>
        <Box flex={1} style={{ minWidth: 220 }}>
          <TextInput
            icon={SearchIcon}
            placeholder="Search name, email, phone, message…"
            value={searchInput}
            onChange={(e) => onSearchChange(e.currentTarget.value)}
          />
        </Box>

        <Box style={{ minWidth: 160 }}>
          <Select
            value={datePreset}
            onChange={(e) => onDatePresetChange(e.currentTarget.value as DatePreset)}
          >
            <option value="all">All time</option>
            <option value="today">Today</option>
            <option value="7days">Last 7 days</option>
            <option value="30days">Last 30 days</option>
            <option value="month">This month</option>
            <option value="custom">Custom range</option>
          </Select>
        </Box>

        {datePreset === 'custom' && (
          <>
            <Box style={{ minWidth: 150 }}>
              <TextInput
                type="date"
                value={customFrom}
                onChange={(e) => onCustomFromChange(e.currentTarget.value)}
              />
            </Box>
            <Box style={{ minWidth: 150 }}>
              <TextInput
                type="date"
                value={customTo}
                onChange={(e) => onCustomToChange(e.currentTarget.value)}
              />
            </Box>
          </>
        )}

        {hasActiveFilters && (
          <Button text="Clear filters" mode="ghost" onClick={onClear} style={{ cursor: 'pointer' }} />
        )}
      </Flex>
    </Card>
  );
}

// ─── Main Tool ────────────────────────────────────────────────────────────────

export function ContactSubmissionsTool() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Drawer
  const [selected, setSelected] = useState<Submission | null>(null);

  // Delete confirm
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Filters
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const [datePreset, setDatePreset] = useState<DatePreset>('all');
  const [customFrom, setCustomFrom] = useState('');
  const [customTo, setCustomTo] = useState('');

  const [refreshKey, setRefreshKey] = useState(0);
  const LIMIT = 20;

  // Debounce search input
  useEffect(() => {
    const timeout = setTimeout(() => setSearch(searchInput.trim()), 400);
    return () => clearTimeout(timeout);
  }, [searchInput]);

  const { from, to } = useMemo(
    () => getPresetRange(datePreset, customFrom, customTo),
    [datePreset, customFrom, customTo],
  );

  const hasActiveFilters = Boolean(search || datePreset !== 'all');

  // Reset to first page whenever filters change
  useEffect(() => {
    setPage(1);
  }, [search, from, to]);

  const fetchSubmissions = useCallback(() => {
    setLoading(true);
    setError(null);
    setRefreshKey((k) => k + 1);
  }, []);

  const clearFilters = useCallback(() => {
    setSearchInput('');
    setSearch('');
    setDatePreset('all');
    setCustomFrom('');
    setCustomTo('');
  }, []);

  useEffect(() => {
    let active = true;
    const controller = new AbortController();
    const params = new URLSearchParams({ page: String(page), limit: String(LIMIT) });
    if (search) params.set('search', search);
    if (from) params.set('from', from);
    if (to) params.set('to', to);

    fetch(`/api/contact/submissions?${params.toString()}`, {
      signal: controller.signal,
      headers: STUDIO_API_HEADERS,
    })
      .then((res) => res.json())
      .then((data: ApiResponse) => {
        if (!active) return;
        if (data.error) throw new Error(data.error);
        setSubmissions(data.submissions || []);
        setTotal(data.total || 0);
        setTotalPages(data.totalPages || 1);
        setLoading(false);
      })
      .catch((e: unknown) => {
        if (!active || (e instanceof Error && e.name === 'AbortError')) return;
        setError(e instanceof Error ? e.message : 'Unknown error');
        setLoading(false);
      });

    return () => {
      active = false;
      controller.abort();
    };
  }, [page, refreshKey, search, from, to]);

  const confirmDelete = useCallback(async () => {
    if (!deleteTargetId) return;
    setDeleting(true);
    try {
      await fetch(`/api/contact/submissions?id=${deleteTargetId}`, {
        method: 'DELETE',
        headers: STUDIO_API_HEADERS,
      });
      setSelected((prev) => (prev?.id === deleteTargetId ? null : prev));
      setDeleteTargetId(null);
      fetchSubmissions();
    } catch {
      setDeleteTargetId(null);
    } finally {
      setDeleting(false);
    }
  }, [deleteTargetId, fetchSubmissions]);

  const groups = useMemo(() => groupSubmissions(submissions), [submissions]);

  return (
    <Box height="fill" style={{ overflowY: 'auto' }}>
      <Container width={2} padding={4}>
        <Stack space={5}>
          {/* Header */}
          <Flex align="center" justify="space-between">
            <Stack space={2}>
              <Heading size={3}>Contact Submissions</Heading>
              <Text size={1} muted>
                {loading ? 'Loading…' : `${total} total submission${total !== 1 ? 's' : ''}`}
              </Text>
            </Stack>
            <Button
              text="Refresh"
              mode="ghost"
              onClick={fetchSubmissions}
              disabled={loading}
            />
          </Flex>

          {/* Filters */}
          <FilterBar
            searchInput={searchInput}
            onSearchChange={setSearchInput}
            datePreset={datePreset}
            onDatePresetChange={setDatePreset}
            customFrom={customFrom}
            customTo={customTo}
            onCustomFromChange={setCustomFrom}
            onCustomToChange={setCustomTo}
            onClear={clearFilters}
            hasActiveFilters={hasActiveFilters}
            isLoading={loading}
          />

          {/* Loading - Prominent loader above list */}
          {loading && (
            <Card padding={4} radius={2} tone="default" style={{ background: 'var(--card-bg-color)', borderColor: 'var(--card-border-color)' }}>
              <Flex align="center" justify="center" gap={3}>
                <Spinner />
                <Text size={1} muted>Fetching submissions…</Text>
              </Flex>
            </Card>
          )}

          {/* Error */}
          {!loading && error && (
            <Card padding={4} tone="critical" radius={2}>
              <Text>{error}</Text>
            </Card>
          )}

          {/* Empty */}
          {!loading && !error && submissions.length === 0 && (
            <Card padding={6} radius={2} tone="transparent" border>
              <Stack space={3} style={{ textAlign: 'center' }}>
                <Text size={3}>📭</Text>
                <Text size={2} muted>
                  {hasActiveFilters ? 'No submissions match these filters' : 'No submissions yet'}
                </Text>
              </Stack>
            </Card>
          )}

          {/* List, grouped by relative date */}
          {!loading && !error && submissions.length > 0 && (
            <Stack space={5}>
              {groups.map((group) => (
                <Stack key={group.label} space={3}>
                  <Text size={1} weight="semibold" muted style={{ textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    {group.label}
                  </Text>
                  <Stack space={2}>
                    {group.items.map((s) => (
                      <SubmissionRow
                        key={s.id}
                        submission={s}
                        isSelected={selected?.id === s.id}
                        onClick={() => setSelected((prev) => (prev?.id === s.id ? null : s))}
                        onDeleteRequest={(e) => {
                          e.stopPropagation();
                          setDeleteTargetId(s.id);
                        }}
                      />
                    ))}
                  </Stack>
                </Stack>
              ))}
            </Stack>
          )}

          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <Flex align="center" justify="center" gap={3}>
              <Button
                text="← Previous"
                mode="ghost"
                disabled={page <= 1 || loading}
                onClick={() => setPage((p) => p - 1)}
              />
              <Text size={1} muted>
                Page {page} of {totalPages}
              </Text>
              <Button
                text="Next →"
                mode="ghost"
                disabled={page >= totalPages || loading}
                onClick={() => setPage((p) => p + 1)}
              />
            </Flex>
          )}
        </Stack>
      </Container>

      {/* Slide-in drawer */}
      <SubmissionDrawer
        submission={selected}
        onClose={() => setSelected(null)}
        onDeleteRequest={(id) => setDeleteTargetId(id)}
      />

      {/* Delete confirm dialog */}
      {deleteTargetId && (
        <DeleteConfirmDialog
          isDeleting={deleting}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTargetId(null)}
        />
      )}
    </Box>
  );
}
