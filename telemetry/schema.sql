create table if not exists telemetry_events (
  id bigserial primary key,
  ts timestamptz not null,
  kind text not null,
  path text not null,
  status int,
  client_class text not null,
  query text,
  result_count int
);
create index if not exists idx_te_ts on telemetry_events (ts);
create index if not exists idx_te_path on telemetry_events (path);

create table if not exists telemetry_reports (
  id bigserial primary key,
  created_at timestamptz not null default now(),
  from_ts timestamptz not null,
  to_ts timestamptz not null,
  markdown text not null
);
