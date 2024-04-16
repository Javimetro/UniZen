*** Keywords ***
Authenticate as Admin
    ${body}    Create Dictionary    username=vili.hakamies@metropolia.fi   password=Metrokubios123!
    ${response}    POST    url=http://localhost:3000/api/auth/login   json=${body}
    Log    ${response.json()}
    ${token}    Set Variable    ${response.json()}[token]
    Log    ${token}
    Set Suite Variable    ${token}
