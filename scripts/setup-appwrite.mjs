#!/usr/bin/env node

/**
 * Appwrite Setup Script
 * 
 * This script creates the complete Appwrite backend infrastructure:
 * - Database
 * - Collections (profiles, credentials, endorsements, flagged_credentials)
 * - Attributes for each collection
 * - Indexes for optimal queries
 * - Storage buckets (user-avatars, evidence-files)
 */

import { Client, Databases, Storage, Permission, Role, ID } from 'node-appwrite';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, '..', '.env.local') });

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://fra.cloud.appwrite.io/v1')
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '68e0b33700078b078177')
  .setKey(process.env.APPWRITE_API_KEY || '');

const databases = new Databases(client);
const storage = new Storage(client);

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || 'skillhouse';
const PROFILES_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_PROFILES_COLLECTION_ID || 'profiles';
const CREDENTIALS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_CREDENTIALS_COLLECTION_ID || 'credentials';
const ENDORSEMENTS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_ENDORSEMENTS_COLLECTION_ID || 'endorsements';
const FLAGGED_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_FLAGGED_COLLECTION_ID || 'flagged_credentials';
const AVATARS_BUCKET_ID = process.env.NEXT_PUBLIC_APPWRITE_AVATARS_BUCKET_ID || 'user-avatars';
const EVIDENCE_BUCKET_ID = process.env.NEXT_PUBLIC_APPWRITE_EVIDENCE_BUCKET_ID || 'evidence-files';

// Helper to wait for attribute to be available
const waitForAttribute = async (databaseId, collectionId, key) => {
  let attempts = 0;
  const maxAttempts = 30;
  
  while (attempts < maxAttempts) {
    try {
      const attr = await databases.getAttribute(databaseId, collectionId, key);
      if (attr.status === 'available') {
        return true;
      }
    } catch (error) {
      // Attribute not ready yet
    }
    await new Promise(resolve => setTimeout(resolve, 2000));
    attempts++;
  }
  throw new Error(`Attribute ${key} did not become available`);
};

async function setupDatabase() {
  console.log('🚀 Starting Appwrite setup...\n');
  
  try {
    // Step 1: Create Database
    console.log('📊 Creating database...');
    try {
      await databases.create(DATABASE_ID, 'SkillHouse Database', true);
      console.log('✅ Database created successfully\n');
    } catch (error) {
      if (error.code === 409) {
        console.log('ℹ️  Database already exists\n');
      } else {
        throw error;
      }
    }

    // Step 2: Create Collections
    console.log('📁 Creating collections...\n');

    // Profiles Collection
    console.log('Creating profiles collection...');
    try {
      await databases.createCollection(
        DATABASE_ID,
        PROFILES_COLLECTION_ID,
        'Profiles',
        [
          Permission.read(Role.any()),
          Permission.create(Role.users()),
          Permission.update(Role.users()),
          Permission.delete(Role.users())
        ],
        true, // document security
        true  // enabled
      );
      console.log('✅ Profiles collection created');
    } catch (error) {
      if (error.code === 409) {
        console.log('ℹ️  Profiles collection already exists');
      } else {
        throw error;
      }
    }

    // Credentials Collection
    console.log('Creating credentials collection...');
    try {
      await databases.createCollection(
        DATABASE_ID,
        CREDENTIALS_COLLECTION_ID,
        'Credentials',
        [
          Permission.read(Role.any()),
          Permission.create(Role.users()),
          Permission.update(Role.users()),
          Permission.delete(Role.users())
        ],
        true, // document security
        true  // enabled
      );
      console.log('✅ Credentials collection created');
    } catch (error) {
      if (error.code === 409) {
        console.log('ℹ️  Credentials collection already exists');
      } else {
        throw error;
      }
    }

    // Endorsements Collection
    console.log('Creating endorsements collection...');
    try {
      await databases.createCollection(
        DATABASE_ID,
        ENDORSEMENTS_COLLECTION_ID,
        'Endorsements',
        [
          Permission.read(Role.any()),
          Permission.create(Role.users()),
          Permission.update(Role.users()),
          Permission.delete(Role.users())
        ],
        true, // document security
        true  // enabled
      );
      console.log('✅ Endorsements collection created');
    } catch (error) {
      if (error.code === 409) {
        console.log('ℹ️  Endorsements collection already exists');
      } else {
        throw error;
      }
    }

    // Flagged Credentials Collection
    console.log('Creating flagged credentials collection...');
    try {
      await databases.createCollection(
        DATABASE_ID,
        FLAGGED_COLLECTION_ID,
        'Flagged Credentials',
        [
          Permission.read(Role.any()),
          Permission.create(Role.users()),
          Permission.update(Role.users()),
          Permission.delete(Role.users())
        ],
        true, // document security
        true  // enabled
      );
      console.log('✅ Flagged credentials collection created\n');
    } catch (error) {
      if (error.code === 409) {
        console.log('ℹ️  Flagged credentials collection already exists\n');
      } else {
        throw error;
      }
    }

    // Step 3: Create Profiles Attributes
    console.log('📋 Creating profiles attributes...');
    const profilesAttributes = [
      { type: 'string', key: 'userId', size: 255, required: true },
      { type: 'string', key: 'username', size: 255, required: true },
      { type: 'email', key: 'email', required: true },
      { type: 'string', key: 'fullName', size: 255, required: true },
      { type: 'string', key: 'bio', size: 1000, required: false },
      { type: 'string', key: 'avatarUrl', size: 2000, required: false },
      { type: 'integer', key: 'credentialCount', required: false, default: 0 },
      { type: 'integer', key: 'endorsementCount', required: false, default: 0 },
      { type: 'datetime', key: 'createdAt', required: true }
    ];

    for (const attr of profilesAttributes) {
      try {
        if (attr.type === 'string') {
          await databases.createStringAttribute(
            DATABASE_ID,
            PROFILES_COLLECTION_ID,
            attr.key,
            attr.size,
            attr.required,
            attr.default,
            false
          );
        } else if (attr.type === 'email') {
          await databases.createEmailAttribute(
            DATABASE_ID,
            PROFILES_COLLECTION_ID,
            attr.key,
            attr.required
          );
        } else if (attr.type === 'integer') {
          await databases.createIntegerAttribute(
            DATABASE_ID,
            PROFILES_COLLECTION_ID,
            attr.key,
            attr.required,
            null,
            null,
            attr.default
          );
        } else if (attr.type === 'datetime') {
          await databases.createDatetimeAttribute(
            DATABASE_ID,
            PROFILES_COLLECTION_ID,
            attr.key,
            attr.required
          );
        }
        console.log(`  ✅ Created attribute: ${attr.key}`);
        await waitForAttribute(DATABASE_ID, PROFILES_COLLECTION_ID, attr.key);
      } catch (error) {
        if (error.code === 409) {
          console.log(`  ℹ️  Attribute ${attr.key} already exists`);
        } else {
          console.error(`  ❌ Failed to create ${attr.key}:`, error.message);
        }
      }
    }

    // Step 4: Create Credentials Attributes
    console.log('\n📋 Creating credentials attributes...');
    const credentialsAttributes = [
      { type: 'string', key: 'userId', size: 255, required: true },
      { type: 'string', key: 'title', size: 255, required: true },
      { type: 'string', key: 'category', size: 100, required: true },
      { type: 'string', key: 'description', size: 5000, required: true },
      { type: 'string', key: 'evidenceUrl', size: 2000, required: false },
      { type: 'string', key: 'evidenceType', size: 50, required: false },
      { type: 'enum', key: 'status', elements: ['pending', 'verified', 'rejected'], required: false, default: 'pending' },
      { type: 'integer', key: 'endorsementCount', required: false, default: 0 },
      { type: 'boolean', key: 'isPublic', required: false, default: true },
      { type: 'datetime', key: 'createdAt', required: true },
      { type: 'datetime', key: 'verifiedAt', required: false }
    ];

    for (const attr of credentialsAttributes) {
      try {
        if (attr.type === 'string') {
          await databases.createStringAttribute(
            DATABASE_ID,
            CREDENTIALS_COLLECTION_ID,
            attr.key,
            attr.size,
            attr.required,
            attr.default,
            false
          );
        } else if (attr.type === 'enum') {
          await databases.createEnumAttribute(
            DATABASE_ID,
            CREDENTIALS_COLLECTION_ID,
            attr.key,
            attr.elements,
            attr.required,
            attr.default
          );
        } else if (attr.type === 'integer') {
          await databases.createIntegerAttribute(
            DATABASE_ID,
            CREDENTIALS_COLLECTION_ID,
            attr.key,
            attr.required,
            null,
            null,
            attr.default
          );
        } else if (attr.type === 'boolean') {
          await databases.createBooleanAttribute(
            DATABASE_ID,
            CREDENTIALS_COLLECTION_ID,
            attr.key,
            attr.required,
            attr.default
          );
        } else if (attr.type === 'datetime') {
          await databases.createDatetimeAttribute(
            DATABASE_ID,
            CREDENTIALS_COLLECTION_ID,
            attr.key,
            attr.required
          );
        }
        console.log(`  ✅ Created attribute: ${attr.key}`);
        await waitForAttribute(DATABASE_ID, CREDENTIALS_COLLECTION_ID, attr.key);
      } catch (error) {
        if (error.code === 409) {
          console.log(`  ℹ️  Attribute ${attr.key} already exists`);
        } else {
          console.error(`  ❌ Failed to create ${attr.key}:`, error.message);
        }
      }
    }

    // Step 5: Create Endorsements Attributes
    console.log('\n📋 Creating endorsements attributes...');
    const endorsementsAttributes = [
      { type: 'string', key: 'credentialId', size: 255, required: true },
      { type: 'string', key: 'endorserId', size: 255, required: true },
      { type: 'string', key: 'comment', size: 1000, required: false },
      { type: 'datetime', key: 'createdAt', required: true }
    ];

    for (const attr of endorsementsAttributes) {
      try {
        if (attr.type === 'string') {
          await databases.createStringAttribute(
            DATABASE_ID,
            ENDORSEMENTS_COLLECTION_ID,
            attr.key,
            attr.size,
            attr.required,
            attr.default,
            false
          );
        } else if (attr.type === 'datetime') {
          await databases.createDatetimeAttribute(
            DATABASE_ID,
            ENDORSEMENTS_COLLECTION_ID,
            attr.key,
            attr.required
          );
        }
        console.log(`  ✅ Created attribute: ${attr.key}`);
        await waitForAttribute(DATABASE_ID, ENDORSEMENTS_COLLECTION_ID, attr.key);
      } catch (error) {
        if (error.code === 409) {
          console.log(`  ℹ️  Attribute ${attr.key} already exists`);
        } else {
          console.error(`  ❌ Failed to create ${attr.key}:`, error.message);
        }
      }
    }

    // Step 6: Create Flagged Credentials Attributes
    console.log('\n📋 Creating flagged credentials attributes...');
    const flaggedAttributes = [
      { type: 'string', key: 'credentialId', size: 255, required: true },
      { type: 'string', key: 'reporterId', size: 255, required: true },
      { type: 'string', key: 'reason', size: 2000, required: true },
      { type: 'enum', key: 'status', elements: ['pending', 'reviewed', 'resolved'], required: false, default: 'pending' },
      { type: 'datetime', key: 'createdAt', required: true }
    ];

    for (const attr of flaggedAttributes) {
      try {
        if (attr.type === 'string') {
          await databases.createStringAttribute(
            DATABASE_ID,
            FLAGGED_COLLECTION_ID,
            attr.key,
            attr.size,
            attr.required,
            attr.default,
            false
          );
        } else if (attr.type === 'enum') {
          await databases.createEnumAttribute(
            DATABASE_ID,
            FLAGGED_COLLECTION_ID,
            attr.key,
            attr.elements,
            attr.required,
            attr.default
          );
        } else if (attr.type === 'datetime') {
          await databases.createDatetimeAttribute(
            DATABASE_ID,
            FLAGGED_COLLECTION_ID,
            attr.key,
            attr.required
          );
        }
        console.log(`  ✅ Created attribute: ${attr.key}`);
        await waitForAttribute(DATABASE_ID, FLAGGED_COLLECTION_ID, attr.key);
      } catch (error) {
        if (error.code === 409) {
          console.log(`  ℹ️  Attribute ${attr.key} already exists`);
        } else {
          console.error(`  ❌ Failed to create ${attr.key}:`, error.message);
        }
      }
    }

    // Step 7: Create Indexes
    console.log('\n🔍 Creating indexes...');
    
    const indexes = [
      { collection: PROFILES_COLLECTION_ID, key: 'userId_index', type: 'unique', attributes: ['userId'] },
      { collection: PROFILES_COLLECTION_ID, key: 'username_index', type: 'unique', attributes: ['username'] },
      { collection: PROFILES_COLLECTION_ID, key: 'email_index', type: 'unique', attributes: ['email'] },
      { collection: CREDENTIALS_COLLECTION_ID, key: 'userId_index', type: 'key', attributes: ['userId'] },
      { collection: CREDENTIALS_COLLECTION_ID, key: 'status_index', type: 'key', attributes: ['status'] },
      { collection: CREDENTIALS_COLLECTION_ID, key: 'category_index', type: 'key', attributes: ['category'] },
      { collection: CREDENTIALS_COLLECTION_ID, key: 'createdAt_index', type: 'key', attributes: ['createdAt'] },
      { collection: ENDORSEMENTS_COLLECTION_ID, key: 'credentialId_index', type: 'key', attributes: ['credentialId'] },
      { collection: ENDORSEMENTS_COLLECTION_ID, key: 'endorserId_index', type: 'key', attributes: ['endorserId'] },
      { collection: ENDORSEMENTS_COLLECTION_ID, key: 'unique_endorsement', type: 'unique', attributes: ['credentialId', 'endorserId'] },
      { collection: FLAGGED_COLLECTION_ID, key: 'credentialId_index', type: 'key', attributes: ['credentialId'] },
      { collection: FLAGGED_COLLECTION_ID, key: 'status_index', type: 'key', attributes: ['status'] }
    ];

    for (const index of indexes) {
      try {
        await databases.createIndex(
          DATABASE_ID,
          index.collection,
          index.key,
          index.type,
          index.attributes
        );
        console.log(`  ✅ Created index: ${index.key} on ${index.collection}`);
      } catch (error) {
        if (error.code === 409) {
          console.log(`  ℹ️  Index ${index.key} already exists`);
        } else {
          console.error(`  ❌ Failed to create index ${index.key}:`, error.message);
        }
      }
    }

    // Step 8: Create Storage Buckets
    console.log('\n🪣 Creating storage buckets...');
    
    try {
      await storage.createBucket(
        AVATARS_BUCKET_ID,
        'User Avatars',
        [
          Permission.read(Role.any()),
          Permission.create(Role.users()),
          Permission.update(Role.users()),
          Permission.delete(Role.users())
        ],
        false, // file security
        true,  // enabled
        5 * 1024 * 1024, // 5MB max
        ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif'],
        'gzip',
        true,  // encryption
        true   // antivirus
      );
      console.log('✅ User avatars bucket created');
    } catch (error) {
      if (error.code === 409) {
        console.log('ℹ️  User avatars bucket already exists');
      } else {
        console.error('❌ Failed to create avatars bucket:', error.message);
      }
    }

    try {
      await storage.createBucket(
        EVIDENCE_BUCKET_ID,
        'Evidence Files',
        [
          Permission.read(Role.any()),
          Permission.create(Role.users()),
          Permission.update(Role.users()),
          Permission.delete(Role.users())
        ],
        false, // file security
        true,  // enabled
        25 * 1024 * 1024, // 25MB max
        ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif', 'application/pdf', 'video/mp4', 'video/quicktime'],
        'gzip',
        true,  // encryption
        true   // antivirus
      );
      console.log('✅ Evidence files bucket created');
    } catch (error) {
      if (error.code === 409) {
        console.log('ℹ️  Evidence files bucket already exists');
      } else {
        console.error('❌ Failed to create evidence bucket:', error.message);
      }
    }

    console.log('\n✨ Appwrite setup completed successfully!\n');
    console.log('🎉 Your SkillHouse backend is ready to use!\n');
    console.log('Next steps:');
    console.log('1. Run `npm run dev` to start the development server');
    console.log('2. Visit http://localhost:9002/auth to create your first account');
    console.log('3. Start creating and verifying credentials!\n');

  } catch (error) {
    console.error('\n❌ Setup failed:', error);
    process.exit(1);
  }
}

// Run setup
setupDatabase();
