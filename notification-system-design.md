# Notification System Design
#Student Details
Name: Bandreddi Indhuja
Roll Number: VTU25768
Email:bandreddiindhuja7@gmail.com
GitHub_Username: indhud2005

#Stage 1:REST API Design 
###Base URL : http://4.224.186.213/evaluation-service

###Authentication All endpoints require Bearer token authentication.
{
    "token_type": "Bearer",
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJiYW5kcmVkZGlpbmRodWphN0BnbWFpbC5jb20iLCJleHAiOjE3ODE2NzkwOTAsImlhdCI6MTc4MTY3ODE5MCwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6IjgyZGZhMjU2LWE5NzYtNDk4Yy1hMjBlLTU0ZGJlM2NiNWIzOSIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6ImJhbmRyZWRkaSBpbmRodWphIiwic3ViIjoiMjk3MGVjYTktZjg2OC00NDdhLWFjMTctMzFjMGEyNzU1NjhkIn0sImVtYWlsIjoiYmFuZHJlZGRpaW5kaHVqYTdAZ21haWwuY29tIiwibmFtZSI6ImJhbmRyZWRkaSBpbmRodWphIiwicm9sbE5vIjoidnR1MjU3NjgiLCJhY2Nlc3NDb2RlIjoianVGcGh2IiwiY2xpZW50SUQiOiIyOTcwZWNhOS1mODY4LTQ0N2EtYWMxNy0zMWMwYTI3NTU2OGQiLCJjbGllbnRTZWNyZXQiOiJNRGtSc3l1bmJ6UHJYTWRzIn0.q4feXiO0H5XCgrQDA7y7ZL8Jr2eAZSIG1OLbTMwafY4",
    "expires_in": 1781679090
}
### Headers
|Header    | Value    |Required
|Authorization|Bearer{juFphv} | Yes
|Content-Type |application/json |Yes (for POST/PUT)

###API End points
### 1.Get all Notifications
**Endpoints:** 'GET/notifications'
**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| limit | integer | No | Records per page (default: 10) |
| page | integer | No | Page number (default: 1) |
| notification_type | string | No | "Event", "Result", "Placement" |
**Request Example:**
'''
GET http://4.224.186.213/evaluation-service/notifications?limit=10&page=1&notification_type=Placement
'''

**Response:**
'''json
{
    "notifications": [
        {
            "ID": "d146095a-0d86-4a34-9e69-3900a14576bc",
            "Type": "Result",
            "Message": "mid-sem results announced",
            "Timestamp": "2026-04-22 17:51:30",
            "isRead": false
             },
        {
            "ID": "b283218f-ea5a-4b7c-93a9-1f2f240d64b0",
            "Type": "Placement",
            "Message": "Google hiring for SDE roles",
            "Timestamp": "2026-04-22 17:51:18",
            "isRead": false
        }
    ],
    "pagination": {
        "currentPage": 1,
        "totalPages": 10,
        "totalItems": 100,
        "recordsPerPage": 10
    }
}
'''
**Status Code :**
|code   |Descrption  |
|200    |Success     |
|401    |Unauthorized|
|500    |Server Error|
#### 2. Get Single Notification

**Endpoint:** 'GET /notifications/:id'

**Request Example:**
'''
GET http://4.224.186.213/evaluation-service/notifications/d146095a-0d86-4a34-9e69-3900a14576bc
'''

**Response:**
'''json
{
    "ID": "d146095a-0d86-4a34-9e69-3900a14576bc",
    "Type": "Result",
    "Message": "mid-sem results announced",
    "Timestamp": "2026-04-22 17:51:30",
    "isRead": false
}
'''
**Status Codes:**
| Code | Description |
|------|-------------|
| 200 | Success |
| 404 | Notification not found |
| 401 | Unauthorized |
'''
#### 3. Mark Notification as Read

**Endpoint:** 'PUT /notifications/:id/read'

**Request Example:**
'''
PUT http://4.224.186.213/evaluation-service/notifications/d146095a-0d86-4a34-9e69-3900a14576bc/read
'''

**Response:**
'''json
{
    "message": "Notification marked as read",
    "ID": "d146095a-0d86-4a34-9e69-3900a14576bc",
    "isRead": true
}
'''
**Status Codes:**
| Code | Description |
|------|-------------|
| 200 | Success |
| 404 | Notification not found |
| 401 | Unauthorized |
'''
#### 4. Get Unread Count

**Endpoint:** 'GET /notifications/unread/count'

**Request Example:**
'''
GET http://4.224.186.213/evaluation-service/notifications/unread/count
'''

**Response:**
```json
{
    "count": 5
}
'''
**Status Codes:**
| Code | Description |
|------|-------------|
| 200 | Success |
| 401 | Unauthorized |
'''
#### 5. Get Priority Notifications

**Endpoint:** 'GET /notifications/priority'

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| top | integer | No | Number of notifications (default: 10) |

**Request Example:**
'''
GET http://4.224.186.213/evaluation-service/notifications/priority?top=10
'''
**Response:**
'''json
{
    "notifications": [
        {
            "ID": "b283218f-ea5a-4b7c-93a9-1f2f240d64b0",
            "Type": "Placement",
            "Message": "Google hiring for SDE roles",
            "Timestamp": "2026-04-22 17:51:18",
            "priorityScore": 3.85
        },
        {
            "ID": "d146095a-0d86-4a34-9e69-3900a14576bc",
            "Type": "Result",
            "Message": "mid-sem results announced",
            "Timestamp": "2026-04-22 17:51:30",
            "priorityScore": 2.95
        }
    ],
    "priority": "Placement > Result > Event (weighted by recency)"
}
'''
**Status Codes:**
| Code | Description |
|------|-------------|
| 200 | Success |
| 401 | Unauthorized |
''''
#### 6. Logging Middleware

**Endpoint:** 'POST /logs'

**Request Body:**
'''json
{
    "stack": "backend",
    "level": "error",
    "package": "handler",
    "message": "received string, expected bool"
}
'''
**Valid Values:**

| Field | Values |
|-------|--------|
| stack | "backend", "frontend" |
| level | "debug", "info", "warn", "error", "fatal" |
| package | Backend: "cache", "controller", "cron_job", "db", "domain", "handler", "repository", "route", "service" |
| package | Frontend: "api", "component", "hook", "page", "style" |
| package | Both: "auth", "config", "middleware", "utils" |
**Response:**
'''json
{
    "logID": "a4aad02e-19d0-4153-86d9-58bf55d7c402",
    "message": "log created successfully"
}
'''

**Status Codes:**
| Code | Description |
|------|-------------|
| 200 | Log created |
| 400 | Invalid request |
| 401 | Unauthorized |
'''
### Real-Time Notification Mechanism

#### Approach : WebSocket 
'''javascript
const ws = new WebSocket('ws://4.224.186.213:8080');
ws.onmessage = (event) => {
    const notification = JSON.parse(event.data);
    displayNotification(notification);
};
'''
## Stage 2: Database Design

#Choice: Postman
