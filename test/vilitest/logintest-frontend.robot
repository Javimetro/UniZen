*** Settings ***
Library   Browser
Library   RequestsLibrary

*** Test Cases ***
Example Test
    New Page    http://localhost:5173
    Create Session    local    http://localhost:5173
    ${response}=   GET On Session  local  /  expected_status=200
    Should Be Equal As Strings    ${response.reason}  OK
