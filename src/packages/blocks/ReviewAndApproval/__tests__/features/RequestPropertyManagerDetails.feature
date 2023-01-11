Feature: RequestPropertyManagerDetails

    Scenario: User navigates to RequestPropertyManagerDetails
        Given I am a User loading RequestPropertyManagerDetails
        When I navigate to the RequestPropertyManagerDetails
        Then RequestPropertyManagerDetails will load with out errors
        And Should accept the request of property manager
        And Should decline the request of property manager
        And Should load property manager details