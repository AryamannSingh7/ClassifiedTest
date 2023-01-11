Feature: Complex

    Scenario: User navigates to Complex
        Given I am a User loading Complex
        When I navigate to the Complex
        Then Complex will load with out errors
        And Should load the document count
        And Should load the complex details
        And Should open edit complex modal when click on button
        And Should open map modal on click view text
        And Should open slide image modal
        And Should change filter by building
        And Should open shared area page
        And Should close edit complex modal when click on close icon
        And Should close edit complex modal when click on cancel button
        And Should able to change logo of complex
        And Should able to upload the image
        And Should edit the complex details
        And Should close the map modal when click on close icon
        And Should close the slider modal
        And Should see the prev the slider modal
        And Should see the next the slider modal