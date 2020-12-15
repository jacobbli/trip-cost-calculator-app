# Trip Calculator

Allows users to calculate the cost of a car share rental based on the rates of a Vancouver based car share company. Please note that the rates used in this app are from ~2018 and may be out of date.

The 'Adjustments' page is for calculating the dollar value of adjustments/refunds in case of open rentals, disputes, etc.

Please note that this application was built solely as a beginner web development project and is not affiliated with any Vancouver based car share companies in any way.

# Installation

Clone the repository.

# Usage

1. Start the python server:
    ```
    python server.py
    ```

2. Visit the app via internet browser:
    ```
    localhost:8080
    ```

3. On the 'Trip Cost' page, enter a start and end date/time to calculate the cost of a trip including all applicable fees.

4. On the 'Adjustments' page, enter the original end date/time, adjusted end date/time, and original start date/time to calculate the dollar value of the adjustment or refund that needs to be made.

5. The 'Parking' page shows all the parking locations for a particular car share service and applies a overlay from the City of Vancouver indicating where residential and permit parking can be found. A Google Maps api key is required to view the map.

*Please note that the map on the 'Parking' page using data from 2018.
