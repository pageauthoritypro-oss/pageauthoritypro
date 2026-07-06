import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Box,
  Button,
  Card,
  Container,
  Dialog,
  Flex,
  Heading,
  Spinner,
  Stack,
  Text,
  Badge,
  Tooltip,
} from '@sanity/ui';
import { CloseIcon, EnvelopeIcon, TrashIcon } from '@sanity/icons';

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
                // borderBottom: '1px solid var(--card-border-color)',
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

  const [refreshKey, setRefreshKey] = useState(0);
  const LIMIT = 20;

  const fetchSubmissions = useCallback(() => {
    setLoading(true);
    setError(null);
    setRefreshKey((k) => k + 1);
  }, []);

  useEffect(() => {
    let active = true;
    const controller = new AbortController();
    fetch(`/api/contact/submissions?page=${page}&limit=${LIMIT}`, { signal: controller.signal })
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
  }, [page, refreshKey]);

  const confirmDelete = useCallback(async () => {
    if (!deleteTargetId) return;
    setDeleting(true);
    try {
      await fetch(`/api/contact/submissions?id=${deleteTargetId}`, { method: 'DELETE' });
      setSelected((prev) => (prev?.id === deleteTargetId ? null : prev));
      setDeleteTargetId(null);
      fetchSubmissions();
    } catch {
      setDeleteTargetId(null);
    } finally {
      setDeleting(false);
    }
  }, [deleteTargetId, fetchSubmissions]);

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

          {/* Loading */}
          {loading && (
            <Flex align="center" justify="center" padding={6}>
              <Spinner />
            </Flex>
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
                <Text size={2} muted>No submissions yet</Text>
              </Stack>
            </Card>
          )}

          {/* List */}
          {!loading && !error && submissions.length > 0 && (
            <Stack space={2}>
              {submissions.map((s) => (
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
