Feature: Buildings

    Scenario: User navigates to Buildings
        Given I am a User loading Buildings
        When I navigate to the Buildings
        Then Buildings will load with out errors
        And Should load the document count
        And Should load the building details
        And Should load the unit list
        And Should open edit building modal when click on button
        And Should open map modal on click view text
        And Should open slide image modal
        And Should close the slider modal
        And Should see the prev the slider modal
        And Should see the next the slider modal
        And Should close edit building modal when click on close icon
        And Should close edit building modal when click on cancel button
        And Should able to change logo of building
        And Should able to upload the image
        And Should edit the building details
        And Should close the map modal when click on close icon