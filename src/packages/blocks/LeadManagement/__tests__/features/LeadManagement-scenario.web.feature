Feature: LeadManagement

    Scenario: User navigates to LeadManagement
        Given I am a User loading LeadManagement
        When I navigate to the LeadManagement
        Then LeadManagement will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors