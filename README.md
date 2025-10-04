# SkillHouse: Verifiable Digital Credentials

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**SkillHouse** is a modern, full-stack application designed to revolutionize how skills are verified, shared, and valued. It empowers individuals to turn their abilities into verifiable digital credentials, backed by AI analysis and secured with optional blockchain integration.

 <!-- Replace with an actual screenshot -->

## Core Features

- **AI-Powered Skill Verification:** Users submit evidence (e.g., a GitHub repo, project URL) which our AI, powered by Google Gemini, analyzes against user-defined criteria to provide objective validation.
- **Digital Credential Issuance:** On successful verification, users are issued a digital badge representing their skill, which can be added to their profile.
- **Public & Shareable Profiles:** Each user gets a public profile (e.g., `skillhouse.app/profile/username`) to showcase their collection of verified credentials.
- **Peer Endorsements:** A simple "endorse" feature allows peers to vouch for a user's skills, adding a layer of social proof.
- **NFT Minting (Optional):** Users have the option to mint their verified credentials as Non-Fungible Tokens (NFTs), giving them true ownership of their achievements on the blockchain.
- **Discover & Explore:** A public gallery allows anyone to search and discover talent across the network by filtering skills and credentials.
- **Admin Dashboard:** A dedicated admin panel for platform oversight, including reviewing flagged credentials and viewing platform analytics.

## How It Works

1.  **Submit Evidence:** A user provides a link to their work and defines the criteria for the skill they want to prove.
2.  **AI Verification:** Our system uses a Genkit flow to analyze the submission, providing an unbiased assessment.
3.  **Mint & Share:** The user receives a digital badge. They can share it via a link or QR code, or mint it as an NFT to own it permanently.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) with [ShadCN UI](https://ui.shadcn.com/) components
- **State Management:** [Zustand](https://github.com/pmndrs/zustand)
- **AI/Generative:** [Google Gemini](https://deepmind.google/technologies/gemini/) via [Genkit](https://firebase.google.com/docs/genkit)
- **Backend:** Configured for [Appwrite](https://appwrite.io/) (Databases, Auth, Storage, Functions)

## Getting Started

Follow these instructions to get a local copy of the project up and running.

### Prerequisites

- Node.js (v18 or later)
- npm, yarn, or pnpm

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/skillhouse.git
    cd skillhouse
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**

    Create a `.env` file in the root of the project and add the necessary environment variables. The `appwrite.json` file outlines the required backend configuration.

    ```bash
    # appwrite.json contains the template for your Appwrite backend.
    # You will need to configure your Appwrite project and add the
    # endpoint and project ID here.
    NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
    NEXT_PUBLIC_APPWRITE_PROJECT_ID=YOUR_PROJECT_ID

    # For AI features, you will need a Google Gemini API Key.
    GEMINI_API_KEY=YOUR_GEMINI_API_KEY
    ```

4.  **Set up the Appwrite Backend:**

    Use the [Appwrite CLI](https://appwrite.io/docs/command-line) to deploy the backend configuration defined in `appwrite.json`.

    ```bash
    appwrite login
    appwrite deploy --all
    ```

5.  **Run the development server:**
    ```bash
    npm run dev
    ```

    The application will be available at `http://localhost:9002`.

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.
