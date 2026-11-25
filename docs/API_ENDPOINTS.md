# Local Tour Guide and Itinerary Coordination System — API Reference

## 5. REST API Design


### 5.1 Conventions

- Base URL: http://localhost:3000/api — all bodies are JSON.
- Resource-oriented plural URIs; HTTP verbs express the action (GET read, POST create, PATCH update, DELETE remove).
- Protected routes require the header Authorization: Bearer <access_token>.
- Errors share one shape: {"statusCode": 400, "message": "...", "error": "Bad Request"}.


### 5.2 Endpoint Summary

| Method | Endpoint | JWT | Success | Purpose |
|---|---|---|---|---|
| POST | /api/auth/register | No | 201 | Register a user |
| POST | /api/auth/login | No | 200 | Log in, receive JWT |
| GET | /api/auth/me | Yes | 200 | Current user |
| GET | /api/languages | Yes | 200 | List Language |
| GET | /api/languages/count | Yes | 200 | Count Language |
| GET | /api/languages/:id | Yes | 200 | Get one Language |
| POST | /api/languages | Yes | 201 | Create Language |
| PATCH | /api/languages/:id | Yes | 200 | Update Language |
| DELETE | /api/languages/:id | Yes | 200 | Delete Language |
| GET | /api/guide-profiles | Yes | 200 | List GuideProfile |
| GET | /api/guide-profiles/count | Yes | 200 | Count GuideProfile |
| GET | /api/guide-profiles/:id | Yes | 200 | Get one GuideProfile |
| POST | /api/guide-profiles | Yes | 201 | Create GuideProfile |
| PATCH | /api/guide-profiles/:id | Yes | 200 | Update GuideProfile |
| DELETE | /api/guide-profiles/:id | Yes | 200 | Delete GuideProfile |
| GET | /api/bookings | Yes | 200 | List Booking |
| GET | /api/bookings/count | Yes | 200 | Count Booking |
| GET | /api/bookings/:id | Yes | 200 | Get one Booking |
| POST | /api/bookings | Yes | 201 | Create Booking |
| PATCH | /api/bookings/:id | Yes | 200 | Update Booking |
| DELETE | /api/bookings/:id | Yes | 200 | Delete Booking |
| GET | /api/guide-languages | Yes | 200 | List GuideLanguage |
| GET | /api/guide-languages/count | Yes | 200 | Count GuideLanguage |
| GET | /api/guide-languages/:id | Yes | 200 | Get one GuideLanguage |
| POST | /api/guide-languages | Yes | 201 | Create GuideLanguage |
| PATCH | /api/guide-languages/:id | Yes | 200 | Update GuideLanguage |
| DELETE | /api/guide-languages/:id | Yes | 200 | Delete GuideLanguage |

Total: 27 endpoints (methods used: GET, POST, PATCH, DELETE).


### 5.3 Status Codes

| Code | Meaning in this API |
|---|---|
| 200 OK | Successful read, update, delete, login. |
| 201 Created | Resource or user created. |
| 400 Bad Request | Validation failed, or a referenced foreign-key record does not exist. |
| 401 Unauthorized | Missing, invalid or expired token; wrong login credentials. |
| 404 Not Found | No record with the requested id. |
| 409 Conflict | Duplicate e-mail on register, or deleting a record that is still referenced. |


### 5.4 Authentication Endpoints


#### POST /api/auth/register  →  201 Created

```
Request
{
  "email": "demo@example.com",
  "fullName": "Demo User",
  "password": "Password123"
}

Response
{
  "id": 1,
  "email": "demo@example.com",
  "fullName": "Demo User",
  "role": "user"
}
```

Errors: 400 (invalid e-mail or password shorter than 8 characters), 409 (e-mail already registered).


#### POST /api/auth/login  →  200 OK

```
Request
{
  "email": "demo@example.com",
  "password": "Password123"
}

Response
{
  "access_token": "<JWT>",
  "token_type": "Bearer"
}
```

Errors: 400 (invalid input), 401 (wrong e-mail or password).


#### GET /api/auth/me  →  200 OK   (header: Authorization: Bearer <JWT>)

```
{
  "id": 1,
  "email": "demo@example.com",
  "fullName": "Demo User",
  "role": "user",
  "createdAt": "2026-12-01T09:00:00.000Z"
}
```

Errors: 401 (missing, invalid or expired token).


### 5.5 Resource Endpoints

All resource endpoints require the Bearer token. The examples below are the exact shapes returned by the implementation. Decimal columns are returned by MySQL as strings in read responses; relations are expanded one level in GET responses and shown as {"id": n} in create/update responses.


#### Language  —  /api/languages

| Field | Validation rules | DB column |
|---|---|---|
| languagename | required, string, not empty | LanguageName |

```
POST /api/languages   → 201
Request
{
  "languagename": "Sample LanguageName"
}

Response
{
  "id": 1,
  "languagename": "Sample LanguageName",
  "createdAt": "2026-12-01T09:00:00.000Z",
  "updatedAt": "2026-12-01T09:00:00.000Z"
}
```

```
GET /api/languages   → 200  (array)
[
  {
    "id": 1,
    "languagename": "Sample LanguageName",
    "createdAt": "2026-12-01T09:00:00.000Z",
    "updatedAt": "2026-12-01T09:00:00.000Z"
  }
]
```

```
PATCH /api/languages/1   → 200
Request
{
  "languagename": "Sample LanguageName (Updated)"
}
```

```
DELETE /api/languages/1   → 200
{
  "deleted": true,
  "id": 1
}
```

Other responses: GET /api/languages/count → 200 {"total": 1}; GET/PATCH/DELETE /api/languages/:id with an unknown id → 404 {"message": "Language not found"}; invalid body → 400; unknown foreign-key id → 400; deleting a record that is still referenced → 409.


#### GuideProfile  —  /api/guide-profiles

| Field | Validation rules | DB column |
|---|---|---|
| bio | optional, string | Bio |
| licensenumber | required, string, not empty | LicenseNumber |
| availability | required, string, not empty | Availability |
| userid (→ User) | required, integer, min 1 | UserID |

```
POST /api/guide-profiles   → 201
Request
{
  "bio": "Sample Bio",
  "licensenumber": "Sample LicenseNumber",
  "availability": "Sample Availability",
  "userid": 1
}

Response
{
  "id": 1,
  "bio": "Sample Bio",
  "licensenumber": "Sample LicenseNumber",
  "availability": "Sample Availability",
  "user": {
    "id": 1
  },
  "createdAt": "2026-12-01T09:00:00.000Z",
  "updatedAt": "2026-12-01T09:00:00.000Z"
}
```

```
GET /api/guide-profiles   → 200  (array)
[
  {
    "id": 1,
    "bio": "Sample Bio",
    "licensenumber": "Sample LicenseNumber",
    "availability": "Sample Availability",
    "user": {
      "id": 1,
      "fullName": "Demo User",
      "email": "demo@example.com",
      "role": "user",
      "createdAt": "2026-12-01T09:00:00.000Z",
      "updatedAt": "2026-12-01T09:00:00.000Z"
    },
    "createdAt": "2026-12-01T09:00:00.000Z",
    "updatedAt": "2026-12-01T09:00:00.000Z"
  }
]
```

```
PATCH /api/guide-profiles/1   → 200
Request
{
  "bio": "Sample Bio (Updated)"
}
```

```
DELETE /api/guide-profiles/1   → 200
{
  "deleted": true,
  "id": 1
}
```

Other responses: GET /api/guide-profiles/count → 200 {"total": 1}; GET/PATCH/DELETE /api/guide-profiles/:id with an unknown id → 404 {"message": "GuideProfile not found"}; invalid body → 400; unknown foreign-key id → 400; deleting a record that is still referenced → 409.


#### Booking  —  /api/bookings

| Field | Validation rules | DB column |
|---|---|---|
| tourdate | required, ISO-8601 date string | TourDate |
| status | required, string, not empty | Status |
| userid (→ User) | required, integer, min 1 | UserID |
| guideid (→ GuideProfile) | required, integer, min 1 | GuideID |

```
POST /api/bookings   → 201
Request
{
  "tourdate": "2026-12-01T09:00:00.000Z",
  "status": "Sample Status",
  "userid": 1,
  "guideid": 1
}

Response
{
  "id": 1,
  "tourdate": "2026-12-01T09:00:00.000Z",
  "status": "Sample Status",
  "user": {
    "id": 1
  },
  "guideprofile": {
    "id": 1
  },
  "createdAt": "2026-12-01T09:00:00.000Z",
  "updatedAt": "2026-12-01T09:00:00.000Z"
}
```

```
GET /api/bookings   → 200  (array)
[
  {
    "id": 1,
    "tourdate": "2026-12-01T09:00:00.000Z",
    "status": "Sample Status",
    "user": {
      "id": 1,
      "fullName": "Demo User",
      "email": "demo@example.com",
      "role": "user",
      "createdAt": "2026-12-01T09:00:00.000Z",
      "updatedAt": "2026-12-01T09:00:00.000Z"
    },
    "guideprofile": {
      "id": 1,
      "bio": "Sample Bio",
      "licensenumber": "Sample LicenseNumber",
      "availability": "Sample Availability",
      "user": {
        "id": 1,
        "fullName": "Demo User",
        "email": "demo@example.com",
        "role": "user",
        "createdAt": "2026-12-01T09:00:00.000Z",
        "updatedAt": "2026-12-01T09:00:00.000Z"
      },
      "createdAt": "2026-12-01T09:00:00.000Z",
      "updatedAt": "2026-12-01T09:00:00.000Z"
    },
    "createdAt": "2026-12-01T09:00:00.000Z",
    "updatedAt": "2026-12-01T09:00:00.000Z"
  }
]
```

```
PATCH /api/bookings/1   → 200
Request
{
  "status": "Sample Status (Updated)"
}
```

```
DELETE /api/bookings/1   → 200
{
  "deleted": true,
  "id": 1
}
```

Other responses: GET /api/bookings/count → 200 {"total": 1}; GET/PATCH/DELETE /api/bookings/:id with an unknown id → 404 {"message": "Booking not found"}; invalid body → 400; unknown foreign-key id → 400; deleting a record that is still referenced → 409.


#### GuideLanguage  —  /api/guide-languages

| Field | Validation rules | DB column |
|---|---|---|
| guideid (→ GuideProfile) | required, integer, min 1 | GuideID |
| languageid (→ Language) | required, integer, min 1 | LanguageID |

```
POST /api/guide-languages   → 201
Request
{
  "guideid": 1,
  "languageid": 1
}

Response
{
  "id": 1,
  "guideprofile": {
    "id": 1
  },
  "language": {
    "id": 1
  },
  "createdAt": "2026-12-01T09:00:00.000Z",
  "updatedAt": "2026-12-01T09:00:00.000Z"
}
```

```
GET /api/guide-languages   → 200  (array)
[
  {
    "id": 1,
    "guideprofile": {
      "id": 1,
      "bio": "Sample Bio",
      "licensenumber": "Sample LicenseNumber",
      "availability": "Sample Availability",
      "user": {
        "id": 1,
        "fullName": "Demo User",
        "email": "demo@example.com",
        "role": "user",
        "createdAt": "2026-12-01T09:00:00.000Z",
        "updatedAt": "2026-12-01T09:00:00.000Z"
      },
      "createdAt": "2026-12-01T09:00:00.000Z",
      "updatedAt": "2026-12-01T09:00:00.000Z"
    },
    "language": {
      "id": 1,
      "languagename": "Sample LanguageName",
      "createdAt": "2026-12-01T09:00:00.000Z",
      "updatedAt": "2026-12-01T09:00:00.000Z"
    },
    "createdAt": "2026-12-01T09:00:00.000Z",
    "updatedAt": "2026-12-01T09:00:00.000Z"
  }
]
```

```
PATCH /api/guide-languages/1   → 200
Request
{
  "guideid": 1
}
```

```
DELETE /api/guide-languages/1   → 200
{
  "deleted": true,
  "id": 1
}
```

Other responses: GET /api/guide-languages/count → 200 {"total": 1}; GET/PATCH/DELETE /api/guide-languages/:id with an unknown id → 404 {"message": "GuideLanguage not found"}; invalid body → 400; unknown foreign-key id → 400; deleting a record that is still referenced → 409.
