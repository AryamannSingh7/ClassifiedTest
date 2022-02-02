Feature: BroadcastMessage

    Scenario: User navigates to BroadcastMessage
        Given I am a User loading BroadcastMessage
        When I navigate to the BroadcastMessage
        Then BroadcastMessage will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors