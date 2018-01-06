# API Documentation
This documentation describes the format for sending to and receiving data from all the endpoints of the API. See **ENDPOINTS_LIST.md** for a list of all endpoints.

**NB:** Prefix all urls with `/api` e.g `/api/srh-index/3`.

### /top-schools/{n}
Get the top n schools (see **RATING\_AND\_RANKING.md**).

Request: GET

Params:
- n: number of schools to return (max: 10).

Sample data:
```
[
  {
    rank: 1,
    id: 19,
    name: "Ahmadu Bello University, Zaria",
    website: "http://abu.edu.ng",
    logo_url: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Ahmadu_Bello_University_logo.png",
    points: 76,
    reviews: 102
  },
  ...
]
```

### /suggested-reviews/{n}
Get n suggested matches (i.e School 1 vs School 2).

Request: GET

Params:
- n: number of matches to return

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

### /top-reviews/{n}
Get the top n reviews (written) in the last 6 months.

Request: GET

Params:
- n: number of reviews to return

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

### /top-reports/{n}
Get the top n reports in the last 6 months.

Request: GET

Params:
- n: number of reports to return

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
    points: 76,
    reviews: 102
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
...

### /user/{id}/reviews/{page}
...

### /user/{id}/comments/{page}
...

### /user/{id}/reports/{page}
...

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
...

### /school/{id}/reports/{page}
...

### /review/{id}
...

### /review/{id}/comments/{page}
...

### /review/{id}
...

### /review/{id}
...

### /report/{id}
...

### /report/{id}/comments/{page}
...

### /report/{id}
...

### /report/{id}
...