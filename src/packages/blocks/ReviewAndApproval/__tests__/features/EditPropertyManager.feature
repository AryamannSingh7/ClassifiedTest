Feature: PropertyManagerDetails

    Scenario: User navigates to EditPropertyManager
        Given I am a User loading EditPropertyManager
        When I navigate to the EditPropertyManager
        Then EditPropertyManager will load with out errors