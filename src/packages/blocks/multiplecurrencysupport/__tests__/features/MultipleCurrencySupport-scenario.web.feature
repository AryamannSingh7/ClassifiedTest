Feature: MultipleCurrencySupport

    Scenario: User navigates to MultipleCurrencySupport
        Given I am a User loading MultipleCurrencySupport
        When I navigate to the MultipleCurrencySupport
        Then MultipleCurrencySupport will load with out errors
        And I can enter text with out errors
        And I can leave the screen with out errors