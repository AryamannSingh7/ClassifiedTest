Feature: ChairmanNotification

    Scenario: User navigates to ChairmanNotification
        Given I am a User loading ChairmanNotification
        When I navigate to the ChairmanNotification
        Then ChairmanNotification will load with out errors
        And Should load task notification
        And Should load message notification
        And Should delete the single notification
        And Should update read un-read status of notification