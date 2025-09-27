/**
 * Last Updated Functionality
 * Displays the last git commit date in the footer
 */

// Function to format date in a readable format
function formatDate(date) {
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short'
    };
    return date.toLocaleDateString('en-US', options);
}

// Function to get last commit date from GitHub API
async function getLastCommitDate() {
    try {
        const response = await fetch('https://api.github.com/repos/sumaiyahibrahim/updated-portfolio/commits?per_page=1');
        if (!response.ok) {
            throw new Error('Failed to fetch commit data');
        }
        
        const commits = await response.json();
        if (commits && commits.length > 0) {
            const lastCommitDate = new Date(commits[0].commit.committer.date);
            return formatDate(lastCommitDate);
        }
    } catch (error) {
        console.warn('Could not fetch last commit date:', error);
        // Fallback to current date if API fails
        return formatDate(new Date());
    }
}

// Function to update the last updated element
async function updateLastUpdated() {
    const lastUpdatedElement = document.getElementById('last-updated');
    if (lastUpdatedElement) {
        try {
            lastUpdatedElement.textContent = 'Loading...';
            const lastUpdated = await getLastCommitDate();
            lastUpdatedElement.textContent = `Last updated: ${lastUpdated}`;
        } catch (error) {
            console.error('Error updating last updated date:', error);
            lastUpdatedElement.textContent = `Last updated: ${formatDate(new Date())}`;
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', updateLastUpdated);
