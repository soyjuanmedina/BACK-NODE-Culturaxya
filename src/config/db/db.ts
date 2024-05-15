import postgres from 'postgres'

const connectionOptions = {
  host: 'aws-0-eu-central-1.pooler.supabase.com',
  port: 5432,
  user: 'postgres.tagjtsodscjaeabgdxzw',
  password: 'm*WUuffiiP0E',
  database: 'postgres'
};

export const connection = postgres( 'postgres://postgres.tagjtsodscjaeabgdxzw:liv@BZwkz91H@aws-0-eu-central-1.pooler.supabase.com:5432/postgres', connectionOptions )

// export default connection