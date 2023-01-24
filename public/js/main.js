/**
 * Fetch accessibility issues
 * @param {SubmitEvent} e 
 * @returns 
 */
const testAcessibility = async (e) => {
    e.preventDefault()

    const url = document.querySelector('#url').value

    if (url === '') {
        alert('Please add a URL')
        return
    } else {
        setLoading()

        try {
            const response = await fetch(`/api/test?url=${url}`)

            if (response.status !== 200) {
                setLoading(false)
                alert('Something went wrong')
            } else {
                const { issues} = await response.json()
                addIssuesToDOM(issues)
            }
            setLoading(false)
        } catch (error) {
            setLoading(false)
            alert('Something went wrong')
        }
    }

}

/**
 *  Add issues to the DOM
 * @param {Array} issues 
 */
const addIssuesToDOM = (issues) => {
    /** @type {HTMLDivElement} */
    const issuesOutput = document.querySelector('#issues')
    
    if (issues.length === 0) {
        issuesOutput.innerHTML = '<h4>No Issues Found</h4>'
    } else {
        issues.forEach(issue => {
            const output = `
            <div class="card mb-5 text-dark">
                <div class="card-body">
                    <h4>${issue.message}</h4>
                </div>
        
                <p class="bg-light p-3 my-3">
                    ${escapeHTML(issue.context)}
                </p>
        
                <p class="bg-secondary text-light p-2">
                    CODE: ${issue.code}
                </p>
            </div>
            `

            issuesOutput.innerHTML += output
        })
    }
}
/**
 * Set loading state
 * @param {boolean} isLoading 
 */
const setLoading = (isLoading = true) => {
    const loader = document.querySelector('.loader')
    if (isLoading) {
        loader.getElementsByClassName.display = 'block'
    } else {
        loader.getElementsByClassName.display = 'none'
    }
}

/**
 * Escape HTML content
 * @param {String} html 
 */
function escapeHTML(html) {
    return html
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;')
}

document.querySelector('#form').addEventListener('submit', testAcessibility)