Feature: OwnerNotification

    Scenario: User navigates to OwnerNotification
        Given I am a User loading OwnerNotification
        When I navigate to the OwnerNotification
        Then OwnerNotification will load with out errors
        Then Should load all notification
        And Should go back to dashboard
        And Should handle the delete notification modal
        And Should handle the delete notification
        And Should close delete notification modal when click on outside modal
        And Should close delete notification modal when click on cancel button
        And Should select all notification for delete
        And Should delete the notification
        And Should able to select notification