### Assign Mentor

#STUDENTS
```
create student
POST
https://assign-mentor-abh.herokuapp.com//api/student

{
    "name":"Abul Hissam "
}
```
```
fetch students
GET
https://assign-mentor-abh.herokuapp.com//api/student
```
```
assignMentor to student
PUT
https://assign-mentor-abh.herokuapp.com//api/student/:studentId
{
    "mentorId":"mentorId"
}
```

#MENTORS
```
createMentor
POST
https://assign-mentor-abh.herokuapp.com//api/mentor
{
    "name": "mentor 1"
}
```
```
fetchMentors
GET
https://assign-mentor-abh.herokuapp.com//api/mentor
```
```
fetchMentorsByID
GET
https://assign-mentor-abh.herokuapp.com//api/mentor/:mentorId
```
```
assingnStudents to mentor
https://assign-mentor-abh.herokuapp.com//api/mentor/:mentorId
PUT
{
  "students":["studentId","studentId"]
}

