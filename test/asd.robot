*** Settings ***
Library    RequestsLibrary
Library    Collections
Resource   restful_booker_keywords.resource
Suite Setup    Authenticate as Admin

*** Test Cases ***
Get entries from the system
    ${headers}=    Create Dictionary    Authorization    Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo2LCJ1c2VybmFtZSI6InRlc3RpdXNlciIsImVtYWlsIjoidGVzdGlAZXhhbXBsZS5jb20iLCJjcmVhdGVkX2F0IjoiMjAyNC0wMy0wOVQwODo1OTo0Mi4wMDBaIiwidXNlcl9sZXZlbCI6InJlZ3VsYXIiLCJpYXQiOjE3MTI4MTg2MzAsImV4cCI6MTcxMjgyMjIzMH0.IPW7hvD5bbx6J5a6YKzrP8973cMoLanmhg6_dCMjk_w
    ${response}=    GET    http://localhost:3000/api/entries    headers=${headers}

