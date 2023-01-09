Feature: ViewPersonalDocument

    Scenario: User navigates to ViewPersonalDocument
        Given I am a User loading ViewPersonalDocument
        When I navigate to the ViewPersonalDocument
        Then ViewPersonalDocument will load with out errors
        And Should load the personal document