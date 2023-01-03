Feature: PropertyManagerRequest

    Scenario: User navigates to PropertyManagerRequest
        Given I am a User loading PropertyManagerRequest
        When I navigate to the PropertyManagerRequest
        Then PropertyManagerRequest will load with out errors

    Scenario: Property Manager New Request List
        Given I am a User loading PropertyManagerNewRequestList
        When PropertyManagerNewRequestList load without error
        Then Should show property manager new request list in web
        And Should not show request list is empty in web
        And Should accept the new property manager request
        And Should decline the new property manager request