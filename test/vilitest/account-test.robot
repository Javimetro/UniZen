
*** Settings ***
Library    RequestsLibrary
Library    Collections
Library    Browser
Resource   login.resource

*** Keywords ***
Pause Execution
    Wait Until Keyword Succeeds    1h    5s    Log    Pausing test execution. Press Ctrl+C to continue.

*** Test Cases ***
Post Credentials to Kubios
    Create Session    my_session    ${LOGIN_URL}
    ${data}=    Create Login Data
    ${headers}=    Create Headers
    ${status}    ${response}=    Run Keyword And Ignore Error    POST On Session    my_session    /api/auth/login    json=${data}    headers=${headers}
    Run Keyword If    '${status}' == 'FAIL'    Fail    ${response}
    Should Contain    ${response.json()["message"]}    Logged in successfully with Kubios
    New Browser    chromium    headless=False
    New Page    http://localhost:5173/client/index.html
    Type Text    id=username    vili.hakamies@metropolia.fi
    Type Text    id=password    Metrokubios123!
    Click    xpath=//input[@value='Login']
    New Page    http://localhost:5173/client/diary.html
    Wait For Elements State    xpath://a[@href='account.html']    visible
    Click    xpath://a[@href='account.html']
    Wait For Elements State    id=logoutBtn    visible
    Click    id=logoutBtn

