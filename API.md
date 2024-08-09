# Short Link Tracker Remover API | Documentation

## Endpoint

`POST /clearLink`

## Description

Cleans a list of links by removing tracking parameters and resolving short URLs.

## Request Body

```json
{
  "links": ["string"]
}
```

| Field | Type     | Description                  | Required |
| ----- | -------- | ---------------------------- | -------- |
| links | string[] | Array of links to be cleaned | Yes      |

## Response

### Successful Response

**Status Code:** 200 OK

```json
{
  "status": "string",
  "message": "string",
  "time": "string",
  "cleanedLinks": [
    {
      "original": "string",
      "cleaned": "string",
      "debugInfo": ["string"]
    }
  ]
}
```

| Field        | Type   | Description                                |
| ------------ | ------ | ------------------------------------------ |
| status       | string | Cleaner execution status                   |
| message      | string | Cleaner status message                     |
| time         | string | ISO-8601 UTC timestamp                     |
| cleanedLinks | array  | Processed links with debugging information |

Each object in the `cleanedLinks` array contains:

| Field     | Type     | Description                |
| --------- | -------- | -------------------------- |
| original  | string   | Original link              |
| cleaned   | string   | Cleaned link               |
| debugInfo | string[] | Array of debug information |

## Example

### Request

Request:

```http
POST /clearLink
Content-Type: application/json
Authorization: Bearer <token>
```
```json
{
  "links": [
    "https://example.com/?utm_source=newsletter&utm_medium=email",
    "https://youtu.be/dQw4w9WgXcQ?si=XGxIE1hr0w4&feature=android&t=1",
    "https://b23.tv/Xi7ESbv"
  ]
}
```

### Response

```json
{
    "status": "success",
    "message": "Links processed successfully",
    "time": "2011-12-13T14:15:16.789Z",
    "cleanedLinks": [
        {
            "original": "https://example.com/?utm_source=newsletter&utm_medium=email",
            "cleaned": "https://example.com/",
            "debugInfo": [
                "[Base Rules] Processed.",
                "[Base Rules] Removed parameter: utm_source",
                "[Base Rules] Removed parameter: utm_medium"
            ]
        },
        {
            "original": "https://youtu.be/dQw4w9WgXcQ?si=XGxIE1hr0w4&feature=android&t=1",
            "cleaned": "https://m.youtube.com/watch?t=1&v=dQw4w9WgXcQ",
            "debugInfo": [
                "[youtube.com cleaner] Processed.",
                "[YouTube Rules] Removed parameter: feature",
                "[YouTube Rules] Removed parameter: si"
            ]
        },
        {
            "original": "https://b23.tv/Xi7ESbv",
            "cleaned": "https://m.bilibili.com/video/BV1eS4y157Ey",
            "debugInfo": [
                "[b23.tv cleaner] Processed.",
                "[Bilibili Rules] Processing b23.tv link",
                "[Bilibili Rules] b23.tv Processed."
            ]
        }
    ]
}
```