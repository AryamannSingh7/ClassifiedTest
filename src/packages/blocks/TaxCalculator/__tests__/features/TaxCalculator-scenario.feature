Feature: TaxCalculator

    Scenario: User navigates to TaxCalculator
        Given I am a User loading TaxCalculator
        When I navigate to the TaxCalculator
        Then TaxCalculator will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors