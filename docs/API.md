# API Documentation
This documentation describes the format for sending to and receiving data from all the endpoints of the API. See **ENDPOINTS_LIST.md** for a list of all endpoints.

**NB:**
- Prefix all urls with `/api` e.g `/api/srh-index/3`.
- Starred (**) endpoints require authentication.

### /top-schools
Get the top 5 schools.

Request: GET

Sample data:
```
[
  {
    rank: 1,
    id: 19,
    name: "Ahmadu Bello University, Zaria",
    website: "http://abu.edu.ng",
    logo_url: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Ahmadu_Bello_University_logo.png",
    rating: 76
  },
  ...
]
```

### /suggested-matches
Get n suggested matches (i.e School 1 vs School 2).

Request: GET

Sample data:
```
[
  {
    school1_id: 23,
    school2_id: 12,
    school1: "Lagos State University",
    school2: "University of Nigeria"
  },
  ...
]
```

### /top-reviews
Get the top 5 reviews (written) in the last 3 months.

Request: GET

Sample data:
```
[
  {
    id: 273,
    content: "UNN is arguably the...",
    created_at: "05-01-2018 23:01:34",
    edited: true,
    school: {
      id: 13,
      name: "Benue State University"
    }
  },
  ...
]
```

### /top-reports
Get the top 5 reports in the last 3 months.

Request: GET

Sample data:
```
[
  {
    id: 20,
    content: "There has been great...",
    created_at: "05-01-2018 23:01:34",
    edited: true,
    school: {
      id: 13,
      name: "Covenant University"
    }
  },
  ...
]
```

### /srh-index/{page}
Get the list of all schools in ascending order of rank (see **RATING\_AND\_RANKING.md**).

Request: GET

Params:
- page: page number (20 items per page, default: 1)

Sample data:
```
[
  {
    rank: 1,
    id: 5,
    name: "Ahmadu Bello University, Zaria",
    description: "ABU is a federal government research university in Zaria, Kaduna State. It was founded on October 4, 1962, as the University of Northern Nigeria. The university operates...",
    website: "http://abu.edu.ng",
    logo_url: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Ahmadu_Bello_University_logo.png",
    rating: 76,
    reviews_count: 52,
    reports_count: 7
  },
  ...
]
```

### /schools-list
Get a list of all the schools in the DB.

Request: GET

Sample data:
```
[
  {
    id: 71,
    name: "University of Ilorin"
  },
  {
    id: 16,
    name: "Federal Unversity of Technology, Minna"
  },
  {
    id: 102,
    name: "Bells University"
  },
  ...
]
```

### /criteria
Get the list of all the rating criteria.

Request: GET

Sample data:
```
[
  {
    id: 3,
    description: "Serene environment for learning"
  },
  {
    id: 1,
    description: "Notable alumni"
  },
  {
    id: 14,
    description: "Science and technology infrastructure"
  },
  ...
]
```

### /rating
Submit a user's rating.

Request: POST

Sample data:
```
{
  schools: {
    school1_id: 23,
    school2_id: 14
  },
  choices: [
    {criterion_id: 7, choice: 14},
    {criterion_id: 23, choice: 14},
    {criterion_id: 1, choice: 23},
    ...
  ]
}
```

### /review
Submit a user's review (written).

Request: POST

Sample data:
```
{
  content: "Let me begin by saying that...",
  school_id: 19
}
```

### /search
Find Schools, Reviews, Reports or Comments.

Request: GET

Params:
- q: query string.

Sample data:
```
[
  {
    type: "school",
    excerpt: "Landmark University is one of the...",
    url: "/school/57"
  },
  {
    type: "review",
    excerpt: "The thing I like the most about...",
    url: "/review/33"
  },
  ...
]
```

### /user/{id}
Get a user.

Request: GET

Params:
- id: id of the user.

Sample data:
```
{
  username: "anonym419",
  email: "johndoe@savage.mail"
}
```

### /user/{id}/ratings/{page}
Get the ratings made by a given user.

Request: GET

Params:
- id: id of the user.
- page: page number.

Sample data:
```
[
  {
    school1_id: 23,
    school2_id: 12,
    school1: "Lagos State University",
    school2: "University of Nigeria",
    choice: 12
  },
  ...
]
```

### /user/{id}/reviews/{page}
Get the reviews made by a given user.

Request: GET

Params:
- id: id of the user.
- page: page number.

Sample data:
```
[
  {
    id: 273,
    content: "UNN is arguably the...",
    created_at: "05-01-2018 23:01:34",
    edited: true,
    school: {
      id: 13,
      name: "Benue State University"
    },
    comments_count: 7,
    upvotes: 12
  },
  ...
]
```

### /user/{id}/comments/{page}
Get the comments made by a given user.

Request: GET

Params:
- id: id of the user.
- page: page number.

Sample data:
```
[
  {
    comment: "Blah blah blah...",
    created_at: "08-01-2018 19:04:22",
    edited: true,
    upvotes: 0
  },
  ...
]
```

### /user/{id}/reports/{page}
Get the reports made by a given user.

Request: GET

Params:
- id: id of the user.
- page: page number.

Sample data:
```
[
  {
    id: 20,
    content: "There has been great...",
    created_at: "05-01-2018 23:01:34",
    edited: true,
    school: {
      id: 13,
      name: "Covenant University"
    },
    comments_count: 10,
    upvotes: 54
  },
  ...
]
```

### /school/{id}
Get a school.

Request: GET

Params:
- id: id of the school.

Sample data:
```
{
  name: "University of Agriculture, Makurdi",
  description: "UniAgric was one of...",
  location: "North Bank, Makurdi, Benue State",
  logo_url: "https://static.ua.co/logo.png",
  website: "https://uniagric.edu.ng"
}
```

### /school/{id}/reviews/{page}
Get the reviews of a school.

Request: GET

Params:
- id: id of the school.
- page: page number.

Sample data:
```
[
  {
    id: 273,
    content: "UNN is arguably the...",
    created_at: "05-01-2018 23:01:34",
    edited: true,
    comments_count: 12,
    upvotes: 223
  },
  ...
]
```

### /school/{id}/reports/{page}
Get the reports of a school.

Request: GET

Params:
- id: id of the school.
- page: page number.

Sample data:
```
[
  {
    id: 20,
    content: "There has been great...",
    created_at: "05-01-2018 23:01:34",
    edited: true,
    comments_count: 10,
    upvotes: 54
  },
  ...
]
```

### /review/{id}
Get a single review

Request: GET

Params:
- id: id of review

Sample data:
```
{
  id: 273,
  content: "UNN is arguably the...",
  created_at: "05-01-2018 23:01:34",
  edited: true,
  school: {
    id: 13,
    name: "Benue State University"
  },
  comments_count: 7,
  upvotes: 12
}
```

### /review/{id}/comments/{page}
Review comments.

Request: GET

Params:
- id: id of the review.
- page: page number.

Sample data:
```
[
  {
    comment: "Blah blah blah...",
    created_at: "08-01-2018 19:04:22",
    edited: true,
    upvotes: 0
  },
  ...
]
```

### /review/{id}
Edit a review

Request: PUT

Params:
- id: id of the review.

Sample data:
```
{
  content: "UNN is arguably the..."
}
```

### /review/{id}
Delete a review.

Request: DELETE

Params:
- id: id of the review.

### /report/{id}
Get a report.

Request: GET

Params:
- id: id of the report.

Sample data:
```
{
  id: 20,
  content: "There has been great...",
  created_at: "05-01-2018 23:01:34",
  edited: true,
  comments_count: 10,
  upvotes: 54
}
```

### /report/{id}/comments/{page}
Report comments.

Request: GET

Params:
- id: id of the report.
- page: page number.

Sample data:
```
[
  {
    comment: "Blah blah blah...",
    created_at: "08-01-2018 19:04:22",
    edited: true,
    upvotes: 0
  },
  ...
]
```

### /report/{id}
Edit a report.

Request: PUT

Params:
- id: id of the report.

Sample data:
```
{
  content: "There has been great..."
}
```

### /report/{id}
Delete a report.

Request: DELETE

Params:
- id: id of the report.

### /rating/{school1\_id}/{school2\_id}**
Delete a user's rating.

Request: DELETE

Params:
- school1_id & 2: school ids.

### /rating
Update a user's rating.

Request: PUT

Sample data:
```
[
  {
    comparison_id: 1,
    choice: 23
  },
  ...
]
```