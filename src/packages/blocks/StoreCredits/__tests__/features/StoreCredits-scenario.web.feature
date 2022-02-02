Feature: StoreCredits

    Scenario: User navigates to StoreCredits
        Given I am a User loading StoreCredits
        When I navigate to the StoreCredits
        Then StoreCredits will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors