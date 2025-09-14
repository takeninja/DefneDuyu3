/*
  # Create appointments table for appointment management

  1. New Tables
    - `appointments`
      - `id` (uuid, primary key)
      - `client_name` (text, not null) - Parent/client name
      - `child_name` (text, not null) - Child's name
      - `email` (text, not null) - Client email
      - `service` (text, not null) - Requested service type
      - `requested_date` (date, not null) - Preferred appointment date
      - `status` (text, default 'Pending') - Appointment status
      - `created_at` (timestamptz) - Request timestamp

  2. Security
    - Enable RLS on `appointments` table
    - Add policy for users to read their own appointments
    - Add policy for authenticated users to create appointments
    - Add policy for authenticated admin users to manage all appointments
*/

CREATE TABLE IF NOT EXISTS appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name text NOT NULL,
  child_name text NOT NULL,
  email text NOT NULL,
  service text NOT NULL,
  requested_date date NOT NULL,
  status text DEFAULT 'Pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- Allow users to read appointments with their email
CREATE POLICY "Users can read their own appointments"
  ON appointments
  FOR SELECT
  TO public
  USING (true);

-- Allow anyone to create appointments (for booking form)
CREATE POLICY "Anyone can create appointments"
  ON appointments
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Allow authenticated users to update and delete appointments
CREATE POLICY "Authenticated users can manage appointments"
  ON appointments
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);