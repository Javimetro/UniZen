*** Keywords ***
Authenticate as Admin
    ${body}=    Create Dictionary    username=testiuser  password=testi123
    ${headers}=    Create Dictionary    Content-Type    application/x-www-form-urlencoded
    ${response}=    POST    url=http://localhost:3000/api/auth/login   data=${body}    headers=${headers}
    Run Keyword If    ${response.status_code} != 200
    ...    Log    Failed to authenticate: status code ${response.status_code}, response: ${response.content}
    Log    ${response.json()}
    ${token}=    Set Variable    ${response.json()}[token]
    Log    ${token}
    Set Suite Variable    ${token}
