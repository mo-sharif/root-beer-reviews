# 🍻 Root Beer Review App - Readme

## Overview

The **Root Beer Review App** is a web application that allows users to view, review, and upload pictures of root beers. The app includes features like pagination, search filters, and modals for adding reviews and uploading images.

## Steps that I took

- **UI Components**:
  - Built a simple UI using **React**.
  - Components for managing root beers, reviews, and image uploads.
  - Added **fade-in animations** using **TailwindCSS** for smoother UI interactions.
  
- **Custom Hooks**:
  - Used custom hooks to fetch **root beer details** and **reviews** from the backend.
  - Hooks help manage side effects, data fetching, and state updates in components.

- **Pagination and Filtering**:
  - Implemented **pagination** for root beer reviews.
  - Added **search functionality** to filter root beers by name and description.
  - Built **sort and rating filters** to enhance the browsing experience.

- **Modals for Adding Content**:
  - Created reusable **modal components** using **Headless UI** for adding reviews and uploading pictures.
  - Integrated modal forms to handle data submission and state updates.

- **Debouncing for Search**:
  - Used **debouncing** to delay search queries by 300ms to improve performance.
  
## File Structure

```
root/
│
├── front/                  # Front-end React app
│   ├── src/
│   │   ├── components/      # Reusable UI components (e.g., Toolbar, Modal, RootBeerCard)
│   │   ├── hooks/           # Custom hooks for fetching data (e.g., useRootBeerDetails)
│   │   ├── pages/           # Page-level components (e.g., Dashboard, RootBeerDetails)
│   │   ├── App.tsx          # Main app component with routing
│   │   └── index.tsx        # Entry point for React app
│   ├── package.json         # Front-end dependencies and scripts
│   └── tailwind.config.js   # TailwindCSS configuration
|   └── README.md            # This README
│
├── back/                   # Backend service (not detailed here)
│
└── README.md               # High-level README
```

## How It Works

- **Main Flow**:
  - Users can browse root beers and see reviews and pictures.
  - Users can add new root beers, reviews, and pictures through modals.

- **Root Beer Details**:
  - On selecting a root beer, users are taken to a details page where they can view:
    - Existing pictures and reviews.
    - Pagination for browsing through multiple reviews.
    - Options to upload pictures or add a review.

- **Data Fetching**:
  - Custom hooks like `useRootBeerDetails` and `useReviews` manage API requests for fetching root beer details and reviews.
  - On adding a new review or picture, data is refetched and updated automatically.

- **Modals**:
  - Reusable modal component for opening forms to add reviews or upload pictures.
  - Modals are triggered by buttons on the UI and manage form submission seamlessly.

- **Animations**:
  - Fade-in animations applied to components for a smoother user experience.
  - Handled via TailwindCSS custom animations.

## Running the Project

- **Front-end Setup**:
  1. Navigate to the `front/` directory.
  2. Install dependencies using `npm install`.
  3. Start the development server using `npm start`.

- **Backend Setup**:
  - Backend should be running in the `back/` directory (not covered here).

  Here's an updated version of the **Next Steps** section for the `README.md` file. You can append it to the existing README to outline future improvements and enhancements for the project.

### Next Steps

1. **Add Unit Tests**
   - Implement comprehensive unit tests for components using tools like `Jest` and `React Testing Library`.
   - Ensure components like `Toolbar`, `RootBeerCard`, and `Modal` are fully covered.
   - Set up code coverage thresholds to maintain a high-quality test suite.

2. **Improve Responsiveness**
   - Optimize the layout for smaller devices such as mobile phones and tablets.
   - Ensure components are responsive by refining TailwindCSS classes or adding media queries.
   - Test UI across multiple screen sizes to ensure proper alignment and readability.

3. **Enhance Accessibility**
   - Ensure the app follows accessibility best practices, including proper use of ARIA attributes, focus management, and keyboard navigation.
   - Add screen reader-friendly text for interactive elements (e.g., buttons and links).
   - Ensure color contrast is adequate for users with visual impairments.

4. **Move Alerts to Global Layout**
   - Implement a global alert/notification system using a global state manager (e.g., React Context or Zustand).
   - Move the alert functionality from individual components to a global layout to centralize error and success messages.
   - Display alerts in a consistent, unobtrusive way, with options to dismiss.

5. **Fix UI Glitches**
   - Address any known UI glitches, such as alignment issues or occasional component flickering.
   - Refactor animations to avoid unnecessary re-renders or performance bottlenecks.
   - Improve handling of modals and loaders to prevent overlap and visual disturbances during transitions.


## Conclusion

The Root Beer Review App is a simple yet interactive application that allows users to manage root beer reviews and images, with features like animations, search, modals, and pagination. The codebase is structured for scalability and maintainability, making it easy to extend with new features.