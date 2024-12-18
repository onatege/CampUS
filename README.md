## Backend Setup

1. **LaunchSettings Configuration**:
   - Open your project in Visual Studio.
   - Open the `launchSettings.json` file.
   - Change the IP in the `http` profile to your computer's IP address.

2. **Migration Process**:
   - Run the following command to apply database migrations:
     ```bash
     dotnet ef database update
     ```

3. **Run the Application**:
   - Select the HTTP option and run the project.

4. **Running Redis**:
   - To run Redis using Docker, use the following command:
     ```bash
     docker run --name redis -p 6379:6379 -d redis
     ```

---

## Frontend Setup

1. **Install Node Modules**:
   - First, navigate to the frontend folder and install the required packages using npm:
     ```bash
     npm install
     ```

2. **Start the Project**:
   - After installing the packages, run the following command to start the project:
     ```bash
     npx expo start
     ```

3. **Using an Emulator**:
   - If you're using an emulator, press the `a` key in the terminal to launch the app on the Android emulator.

4. **Using a Physical Device**:
   - If you're using a physical device, download the [Expo Go](https://play.google.com/store/apps/details?id=host.exp.exponent) app from the Play Store.
   - After installing Expo Go, scan the QR code generated by running `expo start`.

---

This README includes all the necessary setup and instructions for both the backend and frontend. Follow these steps to successfully run the project.
