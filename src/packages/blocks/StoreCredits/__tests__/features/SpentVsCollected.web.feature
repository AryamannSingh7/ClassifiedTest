Feature: SpentVsCollected

    Scenario: User navigates to SpentVsCollected
        Given I am a User loading SpentVsCollected
        When I navigate to the SpentVsCollected
        Then SpentVsCollected will load with out errors
        Then Should load spent vs collected data
        Then Should load year list
        Then Should change the year for filter by year