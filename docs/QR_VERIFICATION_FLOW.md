# 🔍 QR Code Verification Flow - SkillHouse

## Overview
The QR Code verification system allows users to share their credentials with others for instant verification. Anyone can scan the QR code to view the credential details, issuer information, and verification status.

---

## 🎯 Purpose & Use Cases

### What QR Verification Does:
- **Share Credentials Publicly**: Users can show their QR code to recruiters, at events, or on resumes
- **Instant Verification**: Anyone with the QR code can verify the credential is real and view its details
- **Public Proof**: Provides a tamper-proof way to prove skill ownership
- **No Account Needed**: Verifiers don't need a SkillHouse account to check credentials

### What It Does NOT Do:
- ❌ Does NOT allow manual approval/rejection by third parties
- ❌ Does NOT change the credential status (that's done by admin panel)
- ❌ Does NOT require authentication to view
- ❌ Does NOT allow verifiers to endorse (that requires login)

---

## 📊 Complete Flow Diagram

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         USER CREATES CREDENTIAL                          │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
                    ┌───────────────────────────┐
                    │  Dashboard Add Skill Form │
                    │  (skill-submission-form)  │
                    └───────────────────────────┘
                                    │
                                    │ User fills:
                                    │ - Title
                                    │ - Category
                                    │ - Description
                                    │ - Evidence URL/File
                                    │
                                    ▼
                    ┌───────────────────────────┐
                    │ Credential Created        │
                    │ Status: "pending"         │
                    │ Stored in Appwrite DB     │
                    └───────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                         USER VIEWS THEIR CREDENTIAL                      │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
                    ┌───────────────────────────┐
                    │   Skill Card Component    │
                    │   Shows credential with:  │
                    │   - Title, Category       │
                    │   - Status Badge          │
                    │   - "Verify" Button       │
                    └───────────────────────────┘
                                    │
                    ┌───────────────┴───────────────┐
                    │ User clicks "Verify" button   │
                    └───────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                          QR CODE GENERATION                              │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
                    ┌───────────────────────────┐
                    │  QrCodeDialog Component   │
                    │  Opens Modal Dialog       │
                    └───────────────────────────┘
                                    │
                                    │ Generates:
                                    │
                    ┌───────────────┴───────────────┐
                    │ Verification URL:             │
                    │ {APP_URL}/verify/{id}         │
                    │ (e.g., localhost:9002 or      │
                    │  your production domain)      │
                    └───────────────────────────────┘
                                    │
                                    │ Sends to QR API:
                                    │
                    ┌───────────────┴───────────────┐
                    │ https://api.qrserver.com/     │
                    │   v1/create-qr-code/          │
                    │   ?size=250x250               │
                    │   &data={verificationUrl}     │
                    │   &color=A050D3               │
                    │   &bgcolor=F2E7F7             │
                    └───────────────────────────────┘
                                    │
                                    ▼
                    ┌───────────────────────────┐
                    │    QR Code Image          │
                    │    (250x250 PNG)          │
                    │    Purple & white theme   │
                    └───────────────────────────┘
                                    │
                                    ▼
                    ┌───────────────────────────┐
                    │  User can:                │
                    │  - Screenshot QR code     │
                    │  - Show on phone screen   │
                    │  - Print on resume        │
                    │  - Share in email         │
                    └───────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│                      SOMEONE SCANS THE QR CODE                           │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                    ┌───────────────┴───────────────┐
                    │ Scanner uses phone camera     │
                    │ or QR code reader app         │
                    └───────────────────────────────┘
                                    │
                                    ▼
                    ┌───────────────────────────┐
                    │ Phone opens URL:          │
                    │ {APP_URL}/verify/abc123   │
                    │ (uses NEXT_PUBLIC_APP_URL)│
                    └───────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                      VERIFICATION PAGE LOADS                             │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
                    ┌───────────────────────────┐
                    │ /verify/[skillId]/page.tsx│
                    │ Component loads           │
                    └───────────────────────────┘
                                    │
                    ┌───────────────┴───────────────┐
                    │ 1. Extract skillId from URL   │
                    │    const { skillId } =        │
                    │      useParams()              │
                    └───────────────────────────────┘
                                    │
                                    ▼
                    ┌───────────────────────────┐
                    │ 2. Fetch credential data  │
                    │    useCredential(skillId) │
                    └───────────────────────────┘
                                    │
                    ┌───────────────┴───────────────┐
                    │ Calls Appwrite API:           │
                    │ databases.getDocument(        │
                    │   databaseId,                 │
                    │   credentialsCollection,      │
                    │   skillId                     │
                    │ )                             │
                    └───────────────────────────────┘
                                    │
                                    ▼
                    ┌───────────────────────────┐
                    │ 3. Fetch issuer profile   │
                    │    useProfile(userId)     │
                    └───────────────────────────┘
                                    │
                    ┌───────────────┴───────────────┐
                    │ Calls Appwrite API:           │
                    │ databases.listDocuments(      │
                    │   databaseId,                 │
                    │   profilesCollection,         │
                    │   Query.equal('userId',       │
                    │     credential.userId)        │
                    │ )                             │
                    └───────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                      VERIFICATION PAGE DISPLAYS                          │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                    ┌───────────────┴───────────────┐
                    │ Shows credential information: │
                    └───────────────┬───────────────┘
                                    │
                    ┌───────────────┴───────────────┐
                    │ ✅ Header Section:            │
                    │    - CheckCircle Icon         │
                    │    - Status Badge             │
                    │      • "Verified Credential"  │
                    │      • "Pending Verification" │
                    │    - Credential Title         │
                    └───────────────────────────────┘
                                    │
                    ┌───────────────┴───────────────┐
                    │ 📋 Details Section:           │
                    │    - Category                 │
                    │    - Status                   │
                    │    - Evidence Link            │
                    │      (View Submitted Project) │
                    └───────────────────────────────┘
                                    │
                    ┌───────────────┴───────────────┐
                    │ 👤 Issued To Section:         │
                    │    - User Avatar              │
                    │    - Full Name                │
                    │    - Username (clickable)     │
                    │    - Link to profile          │
                    └───────────────────────────────┘
                                    │
                    ┌───────────────┴───────────────┐
                    │ 📝 Description Section:       │
                    │    - Full credential          │
                    │      description/criteria     │
                    └───────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│                         ERROR HANDLING                                   │
└─────────────────────────────────────────────────────────────────────────┘

    ┌────────────────────────────────────────────────┐
    │ If credential not found (invalid/deleted ID):  │
    └────────────────┬───────────────────────────────┘
                     │
                     ▼
         ┌───────────────────────────┐
         │ Show error card:          │
         │ "Credential Not Found"    │
         │ + "Explore Skills" button │
         └───────────────────────────┘

    ┌────────────────────────────────────────────────┐
    │ While loading:                                 │
    └────────────────┬───────────────────────────────┘
                     │
                     ▼
         ┌───────────────────────────┐
         │ Show loading spinner:     │
         │ "Verifying credential..." │
         └───────────────────────────┘
```

---

## 💻 Code Components

### 1. QR Code Generation Component

**File:** `src/components/dashboard/qr-code-dialog.tsx`

```tsx
import { APP_URL } from "@/lib/appwrite/config";

export function QrCodeDialog({
  skillId,
  skillName,
  children,
}: QrCodeDialogProps) {
  // Build verification URL using configured APP_URL
  // Uses NEXT_PUBLIC_APP_URL from environment variables
  const verificationUrl = `${APP_URL}/verify/${skillId}`;
  
  // Generate QR code via API
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(
    verificationUrl
  )}&qzone=1&color=A050D3&bgcolor=F2E7F7`;

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Verify: {skillName}</DialogTitle>
          <DialogDescription>
            Scan this QR code to verify this credential.
          </DialogDescription>
        </DialogHeader>
        <Image
          src={qrCodeUrl}
          alt={`QR Code for ${skillName}`}
          width={250}
          height={250}
        />
      </DialogContent>
    </Dialog>
  );
}
```

**Key Points:**
- Uses external QR API (qrserver.com) for generation
- Custom purple branding colors
- Dynamic URL with credential ID
- Opens in modal dialog

---

### 2. Skill Card with Verify Button

**File:** `src/components/dashboard/skill-card.tsx`

```tsx
<QrCodeDialog skillId={credential.$id || ''} skillName={credential.title}>
  <Button variant="outline" size="sm">
    <QrCode className="mr-2 h-4 w-4" />
    Verify
  </Button>
</QrCodeDialog>
```

**Key Points:**
- Button is wrapped in QrCodeDialog component
- Passes credential ID and name as props
- Opens QR dialog on click

---

### 3. Verification Page

**File:** `src/app/verify/[skillId]/page.tsx`

```tsx
export default function VerifySkillPage() {
  // Extract credential ID from URL
  const { skillId } = useParams();
  
  // Fetch credential data
  const { credential, loading: credentialLoading } = useCredential(skillId as string);
  
  // Fetch issuer profile
  const { profile, loading: profileLoading } = useProfile(credential?.userId);

  // Show loading state
  if (credentialLoading || profileLoading) {
    return <LoadingSpinner />;
  }

  // Handle not found
  if (!credential) {
    return <NotFoundCard />;
  }

  // Display credential details
  return (
    <Card>
      {/* Status Badge */}
      <Badge variant={credential.status === 'verified' ? 'default' : 'secondary'}>
        {credential.status === 'verified' ? 'Verified Credential' : 'Pending Verification'}
      </Badge>
      
      {/* Details */}
      <div>Category: {credential.category}</div>
      <div>Status: {credential.status}</div>
      <Link href={credential.evidenceUrl}>View Evidence</Link>
      
      {/* Issuer Info */}
      <Avatar>
        <AvatarImage src={profile.avatarUrl} />
        <AvatarFallback>{profile.fullName?.charAt(0) || 'U'}</AvatarFallback>
      </Avatar>
      <Link href={`/profile/${profile.username}`}>
        @{profile.username}
      </Link>
      
      {/* Description */}
      <p>{credential.description}</p>
    </Card>
  );
}
```

**Key Points:**
- Public page - no authentication required
- Fetches credential by ID from URL parameter
- Shows full credential details
- Links to issuer profile
- Displays verification status

---

## 🔄 Data Flow

### Database Queries

```typescript
// 1. Fetch Credential
const credential = await databases.getDocument(
  'skillhouse',                    // Database ID
  'credentials',                   // Collection ID
  skillId                          // Document ID from URL
);

// 2. Fetch Profile
const profiles = await databases.listDocuments(
  'skillhouse',                    // Database ID
  'profiles',                      // Collection ID
  [Query.equal('userId', credential.userId)]
);
```

### Credential Status Values
```typescript
type CredentialStatus = 'pending' | 'verified' | 'rejected';

// When credential is created:
status: 'pending'  // Default

// After admin review (in admin panel):
status: 'verified'   // Approved
status: 'rejected'   // Denied
```

---

## 🎨 Visual Status Display

### Verified Credential
```
┌────────────────────────────────────────┐
│  ✅ Verified Credential                │
│  React Development                     │
├────────────────────────────────────────┤
│  📋 Details                            │
│     Category: Development              │
│     Status: verified                   │
│     Evidence: [View Project Link]     │
│                                        │
│  👤 Issued To                          │
│     [Avatar] John Doe                  │
│              @johndoe                  │
│                                        │
│  📝 Description                        │
│     Built a full-stack React app...    │
└────────────────────────────────────────┘
```

### Pending Credential
```
┌────────────────────────────────────────┐
│  🔄 Pending Verification               │
│  Python Machine Learning               │
├────────────────────────────────────────┤
│  📋 Details                            │
│     Category: AI/ML                    │
│     Status: pending                    │
│     Evidence: [View Project Link]     │
│                                        │
│  👤 Issued To                          │
│     [Avatar] Jane Smith                │
│              @janesmith                │
│                                        │
│  📝 Description                        │
│     Implemented ML algorithms...       │
└────────────────────────────────────────┘
```

---

## 🔐 Security & Privacy

### Public Information
✅ **Visible to anyone with QR code:**
- Credential title
- Category
- Description
- Status (verified/pending/rejected)
- Evidence URL (if public)
- Issuer name and username
- Issuer avatar

### Protected Information
🔒 **NOT visible on verification page:**
- User email
- User private credentials
- Private profile information
- Admin notes or flags

### No Authentication Required
- Anyone can scan QR and view
- No SkillHouse account needed
- URL is public and shareable
- Can be indexed by search engines

---

## 🚀 Use Case Examples

### Example 1: Job Interview
```
1. Candidate mentions "React certification" on resume
2. Candidate includes QR code next to claim
3. Recruiter scans QR with phone
4. Verification page shows:
   - ✅ Verified React Development credential
   - View submitted project (GitHub link)
   - Issued to: @candidate_username
   - Category: Development
```

### Example 2: Conference Badge
```
1. Attendee prints QR code on conference badge
2. Other attendees scan to see skills
3. Verification page shows all credential details
4. People can click through to full profile
```

### Example 3: LinkedIn Profile
```
1. User shares verification URL in LinkedIn post
2. Connections click link (no scan needed)
3. Shows credential authenticity
4. Builds professional credibility
```

---

## ⚙️ Technical Implementation

### QR Code API
```
Service: qrserver.com
Endpoint: https://api.qrserver.com/v1/create-qr-code/

Parameters:
- size: 250x250 (pixels)
- data: {APP_URL}/verify/{id} (URL encoded, uses NEXT_PUBLIC_APP_URL)
- qzone: 1 (quiet zone around QR)
- color: A050D3 (purple foreground)
- bgcolor: F2E7F7 (light purple background)

Returns: PNG image

URL will be:
- Development: http://localhost:9002/verify/{id}
- Production: https://skillhouse.appwrite.network/verify/{id}
  (or your custom domain set in NEXT_PUBLIC_APP_URL)
```

### Verification URL Structure
```
Format: {APP_URL}/verify/[credentialId]

Examples:
Development:
- http://localhost:9002/verify/abc123xyz
- http://localhost:9002/verify/67a7d2f100077f4def00

Production (set via NEXT_PUBLIC_APP_URL):
- https://skillhouse.appwrite.network/verify/abc123xyz
- https://your-domain.com/verify/67a7d2f100077f4def00

Route: /app/verify/[skillId]/page.tsx
Dynamic segment: [skillId] = credential.$id
```

### Hooks Used
```typescript
useParams()              // Get skillId from URL
useCredential(skillId)   // Fetch credential data
useProfile(userId)       // Fetch issuer profile
```

---

## 🔄 Related Features

### Endorsements (Different from Verification)
- **Endorsements:** Other users "like" or vouch for a credential
- **Requires:** SkillHouse account login
- **Location:** Discover page, skill cards
- **Effect:** Increases endorsement count, adds to endorsements collection

### Admin Verification (Changes Status)
- **Location:** Admin panel (`/admin/flagged-credentials`)
- **Actions:** Approve (verified) or Reject (rejected)
- **Effect:** Updates credential.status field
- **Who:** Only admin users

### Flagging System
- **Purpose:** Report inappropriate credentials
- **Location:** Flag button on credentials
- **Collection:** flagged_credentials
- **Workflow:** User reports → Admin reviews → Approve/Dismiss

---

## 🎯 Key Differences

| Feature | QR Verification | Endorsements | Admin Approval |
|---------|----------------|--------------|----------------|
| **Purpose** | Share & view credential | Social proof | Status change |
| **Auth Required** | ❌ No | ✅ Yes | ✅ Yes (Admin) |
| **Effect** | Display only | +1 endorsement count | Change status |
| **Who** | Anyone with QR | Logged-in users | Admins only |
| **Location** | Public URL | Discover page | Admin panel |

---

## 📝 Status Lifecycle

```
┌──────────────────────────────────────────────────────────────┐
│                    CREDENTIAL LIFECYCLE                       │
└──────────────────────────────────────────────────────────────┘

User Creates     →    Auto Set       →    Admin Reviews
Credential            Status: pending     in Admin Panel

                                              ↓
                                    ┌─────────┴─────────┐
                                    │                   │
                              Approve               Reject
                                    │                   │
                                    ↓                   ↓
                           Status: verified    Status: rejected
                                    │                   │
                                    ↓                   ↓
                          Shows green badge   Shows red badge
                          on verification     on verification
                          page                page

Note: QR verification works for ALL statuses
      It just DISPLAYS the current status
      It does NOT change the status
```

---

## 🐛 Error Scenarios

### Scenario 1: Invalid Credential ID
```
User scans QR → URL has wrong ID → Page shows:
┌─────────────────────────────────┐
│ Credential Not Found            │
│                                 │
│ The skill credential you are    │
│ looking for does not exist or   │
│ has been removed.               │
│                                 │
│ [Explore Skills Button]         │
└─────────────────────────────────┘
```

### Scenario 2: Deleted Credential
```
Credential was deleted → Same as above
```

### Scenario 3: Network Error
```
No internet → useCredential returns error → 
Shows: "Error loading credential..."
```

---

## 🎨 Customization Options

### QR Code Appearance
```typescript
// Current colors
color: 'A050D3'     // Purple foreground
bgcolor: 'F2E7F7'   // Light purple background

// Could be customized to:
color: '000000'     // Black
bgcolor: 'FFFFFF'   // White

// Or match credential category colors
```

### Verification URL
```typescript
// Uses APP_URL from config (reads NEXT_PUBLIC_APP_URL)
import { APP_URL } from "@/lib/appwrite/config";
const verificationUrl = `${APP_URL}/verify/${skillId}`;

// Environment Variables:
// Development (.env.local):
//   NEXT_PUBLIC_APP_URL=http://localhost:9002
// Production (.env.production):
//   NEXT_PUBLIC_APP_URL=https://skillhouse.appwrite.network
//   or your custom domain
```

---

## ✅ Summary

### What Happens When You Scan a QR Code:

1. **QR Code Contains:** URL to `{APP_URL}/verify/[credentialId]` (configured via NEXT_PUBLIC_APP_URL)
2. **Page Loads:** Public verification page
3. **Data Fetched:** Credential details + issuer profile from Appwrite
4. **Display Shows:**
   - ✅ Verification status badge
   - 📋 Credential details (title, category, description)
   - 🔗 Link to evidence/project
   - 👤 Issuer information with profile link
5. **User Can:** View all details, click to issuer profile, view evidence
6. **User Cannot:** Change status, endorse (without login), edit anything

### Key Points:
- ✅ **Public & Open:** No login required to view
- 🔒 **Read-Only:** Verification page only displays data
- 🎯 **Purpose:** Prove credential authenticity and ownership
- 🔄 **Real-Time:** Always shows current status from database
- 🌐 **Shareable:** Can share URL directly or via QR code

---

**This verification system provides instant, tamper-proof credential validation while maintaining full public transparency!** 🎉
