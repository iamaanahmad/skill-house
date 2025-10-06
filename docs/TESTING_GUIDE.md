# Testing Guide - Profile Creation Fixes

## Prerequisites
- Development server should be running on `http://localhost:9002`
- Browser console open (F12) to view debug logs

## Test Scenarios

### Test 1: New User Signup
1. Navigate to signup page
2. Fill in the form with:
   - Email: test@example.com
   - Password: testpassword123
   - Full Name: Test User
   - Username: testuser
3. Submit the form
4. **Expected Results:**
   - Console should show: "Creating profile with data: {...}"
   - Profile should be created successfully
   - User should be redirected to /dashboard
   - Dashboard should display "Welcome back, Test User!"

### Test 2: OAuth Login (Google/GitHub)
1. Click on OAuth login button
2. Complete OAuth flow
3. **Expected Results:**
   - Console should show: "User found: {...}"
   - Console should show: "User email: your@email.com"
   - If profile doesn't exist: "Creating profile with data: {...}"
   - User should be redirected to /dashboard

### Test 3: Existing User Login
1. Log in with existing credentials
2. **Expected Results:**
   - Console should show: "User found: {...}"
   - Console should show: "Profile found: {...}"
   - No profile creation attempt
   - Dashboard loads successfully

## Debug Logs to Check

### Successful Profile Creation
```javascript
User found: {$id: '...', email: 'user@example.com', name: '...'}
User email: user@example.com
Creating profile for user: 68e1347f528205bc20c1
Creating profile with data: {
  userId: '68e1347f528205bc20c1',
  fullName: 'Test User',
  username: 'testuser',
  email: 'user@example.com',
  bio: '',
  avatarUrl: '',
  credentialCount: 0,
  endorsementCount: 0,
  createdAt: '2025-10-05T...'
}
Profile created: {...}
```

### Expected Errors (If Any)
If you see: **"Email address is required to create a profile"**
- This means the OAuth provider didn't return an email
- Check OAuth provider settings to ensure email scope is requested

## Verification Steps

### 1. Check Appwrite Console
- Go to Appwrite console → Databases → skillhouse → Profiles
- Verify new profile document has all fields:
  - userId
  - username (unique)
  - email (unique)
  - fullName
  - bio
  - avatarUrl
  - credentialCount: 0
  - endorsementCount: 0
  - createdAt

### 2. Check UI Display
- Dashboard: "Welcome back, [Full Name]!"
- Profile dropdown: Shows full name and avatar
- Profile page (/profile/username): Shows full name and details
- Leaderboard: Shows full names of users

### 3. Browser Console
- No error messages about missing fields
- All console.log statements showing expected data
- No 400 Bad Request errors to Appwrite

## Common Issues & Solutions

### Issue: "Missing required attribute 'email'"
**Solution:** User object doesn't have email. Check:
1. OAuth provider settings (enable email scope)
2. User's OAuth account has a verified email
3. Appwrite OAuth configuration

### Issue: Profile shows undefined or null
**Solution:** Clear browser cache and localStorage:
```javascript
// Run in browser console
localStorage.clear();
sessionStorage.clear();
location.reload();
```

### Issue: Username conflict
**Solution:** Username must be unique. Try:
1. Different username
2. Add random suffix to username
3. Check Appwrite console for existing usernames

## Cleanup Between Tests

```javascript
// In browser console - logout and clear session
localStorage.clear();
sessionStorage.clear();
location.href = '/';
```

## Success Criteria
✅ New users can sign up without errors  
✅ OAuth users can log in and get profiles created  
✅ All required fields are populated  
✅ UI displays full names correctly  
✅ No console errors related to profile creation  
✅ Appwrite collection has valid documents  
