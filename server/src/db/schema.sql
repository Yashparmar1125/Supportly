CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT DEFAULT 'admin' NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tickets (
  id SERIAL PRIMARY KEY,
  ticket_id TEXT UNIQUE NOT NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  subject TEXT NOT NULL,
  description TEXT NOT NULL,
  status TEXT CHECK(status IN ('Open', 'In Progress', 'Closed')) DEFAULT 'Open' NOT NULL,
  priority TEXT CHECK(priority IN ('Urgent', 'High', 'Medium', 'Low')) DEFAULT 'Medium' NOT NULL,
  category TEXT CHECK(category IN ('Billing', 'Technical Bug', 'Feature Request', 'Account Access', 'General')) DEFAULT 'General' NOT NULL,
  sentiment TEXT CHECK(sentiment IN ('Frustrated', 'Neutral', 'Delighted')) DEFAULT 'Neutral' NOT NULL,
  channel TEXT CHECK(channel IN ('Web Portal', 'Email', 'API')) DEFAULT 'Web Portal' NOT NULL,
  organization TEXT DEFAULT 'Individual' NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS notes (
  id SERIAL PRIMARY KEY,
  ticket_id TEXT REFERENCES tickets(ticket_id) ON DELETE CASCADE,
  note_text TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Atomic sequence for concurrency-safe ticket ID generation
CREATE SEQUENCE IF NOT EXISTS ticket_id_seq START WITH 1;

-- Backward-compatible column additions for existing tables
ALTER TABLE tickets ADD COLUMN IF NOT EXISTS priority TEXT CHECK(priority IN ('Urgent', 'High', 'Medium', 'Low')) DEFAULT 'Medium' NOT NULL;
ALTER TABLE tickets ADD COLUMN IF NOT EXISTS category TEXT CHECK(category IN ('Billing', 'Technical Bug', 'Feature Request', 'Account Access', 'General')) DEFAULT 'General' NOT NULL;
ALTER TABLE tickets ADD COLUMN IF NOT EXISTS sentiment TEXT CHECK(sentiment IN ('Frustrated', 'Neutral', 'Delighted')) DEFAULT 'Neutral' NOT NULL;
ALTER TABLE tickets ADD COLUMN IF NOT EXISTS channel TEXT CHECK(channel IN ('Web Portal', 'Email', 'API')) DEFAULT 'Web Portal' NOT NULL;
ALTER TABLE tickets ADD COLUMN IF NOT EXISTS organization TEXT DEFAULT 'Individual' NOT NULL;

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_tickets_status ON tickets(status);
CREATE INDEX IF NOT EXISTS idx_tickets_priority_category ON tickets(priority, category);
CREATE INDEX IF NOT EXISTS idx_tickets_created_at ON tickets(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_notes_ticket_id ON notes(ticket_id);

-- Full text search index
ALTER TABLE tickets ADD COLUMN IF NOT EXISTS search_vector tsvector GENERATED ALWAYS AS (
    setweight(to_tsvector('english', coalesce(subject, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(description, '')), 'B') ||
    setweight(to_tsvector('english', coalesce(customer_name, '')), 'C') ||
    setweight(to_tsvector('english', coalesce(customer_email, '')), 'C') ||
    setweight(to_tsvector('english', coalesce(organization, '')), 'B') ||
    setweight(to_tsvector('english', coalesce(category, '')), 'B')
) STORED;
CREATE INDEX IF NOT EXISTS idx_tickets_search ON tickets USING GIN(search_vector);
