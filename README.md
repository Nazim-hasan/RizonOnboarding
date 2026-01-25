# RizonOnboarding

<video src="./demo.mp4" controls></video>

## Prerequisites
Ensure your environment meets the following requirements before building the project:

- **Node.js**: >= 20.0.0
- **Ruby**: >= 2.6.10
- **JDK**: Version 17 is recommended for React Native 0.73+.
- **CocoaPods**: Required for iOS dependency management (Install via `sudo gem install cocoapods`).

## Build Instructions

### 1. Install Dependencies
Run the following command in the root directory to install Node modules:
```bash
yarn install
```
or
```bash
npm install
```

### 2. iOS Setup (Mac Only)
Install iOS dependencies using CocoaPods:
```bash
cd ios && pod install && cd ..
```

### 3. Run on iOS Simulator
To build and run the app on the iOS Simulator:
```bash
yarn ios
```
*Note: Ensure you have Xcode installed and a simulator available.*

### 4. Run on Android Emulator
To build and run the app on the Android Emulator:
```bash
yarn android
```
*Note: Ensure you have Android Studio installed and an emulator running.*

## Architecture
This project follows a **Clean Architecture** approach with an **MVC (Model-View-Controller)** pattern in the Presentation layer to ensure separation of concerns, testability, and maintainability.

### State Management
State is managed locally using **React Hooks (`useState`, `useEffect`)** within custom Controllers (`useOnboardingController`). This keeps business logic separated from the UI components.
- **Controller**: Handles user interactions, API calls (via Use Cases), and navigation logic.
- **View**: purely presentational components (dumb components) that render data provided by the Controller.
- **Model**: TypeScript interfaces defining the shape of the data and state.

### Folder Structure
```
src/
├── domain/                  # Enterprise Business Rules
│   ├── entities/            # Core business objects (e.g., OnboardingStatus)
│   ├── repositories/        # Interfaces for data access
│   └── usecases/            # Application business rules (e.g., GetOnboardingStatus)
│
├── data/                    # Interface Adapters
│   └── repositories/        # Concrete implementations of repositories (e.g., MockOnboardingRepository)
│
├── presentation/            # Frameworks & Drivers (UI)
│   ├── components/          # Shared reusable UI components (Buttons, Inputs, BottomSheets)
│   ├── modules/             # Feature-specific modules
│   │   └── onboarding/
│   │       ├── controllers/ # Logic and State Management (useOnboardingController)
│   │       └── views/       # UI Screens (OnboardingSuccessView, FeedbackView)
│   └── theme.ts             # Centralized design tokens (colors, typography)
└── assets/                  # Static assets (images, fonts)
```
