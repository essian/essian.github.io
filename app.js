document.getElementById('grist-form').addEventListener('submit', function (e) {
    document.getElementById('results').style.display = 'none'
    document.getElementById('loading').style.display = 'block'
    setTimeout(calculateResults, 1000)
    e.preventDefault()
})

function calculateResults() {
    const weightInGrams = parseFloat(document.getElementById('weight').value)
    const length = parseFloat(document.getElementById('length').value)
    const wraps = parseFloat(document.getElementById('wraps').value)
    const gristMetricField = document.getElementById('gristMetric')
    const gristImperialField = document.getElementById('gristImperial')
    const yarnClass = document.getElementById('class')
    const totalLength = document.getElementById('totalLength')

    const totalLengthInMeters = wraps * 2 * length / 100
    const totalLengthInYards = totalLengthInMeters * 1.094
    const weightInPounds = weightInGrams / 453.592
    const gristMetric = totalLengthInMeters / (weightInGrams / 1000)
    const gristImperial = totalLengthInYards / weightInPounds

    if (isFinite(gristImperial)) {
        totalLength.value = totalLengthInMeters.toFixed(2)
        gristMetricField.value = gristMetric.toFixed(2)
        gristImperialField.value = gristImperial.toFixed(2)
        yarnClass.value = getYarnClass(gristImperial)
        document.getElementById('loading').style.display = 'none'
        document.getElementById('results').style.display = 'block'
    } else {
        showError('Please check your inputs')
        document.getElementById('loading').style.display = 'none'
        document.getElementById('results').style.display = 'none'
    }

}

function getYarnClass(grist) {
    console.log(grist)
    let yarnClass = ""
    if (grist > 2400)
        return yarnClass = "Lace"
    if (grist > 1900)
        return yarnClass = "Fingering"
    if (grist > 1200)
        return yarnClass = "Sport"
    if (grist > 900)
        return yarnClass = "DK"
    if (grist > 600)
        return yarnClass = "Worsted/Aran"
    if (grist > 400)
        return yarnClass = "Chunky"
    if (grist > 2400)
        return yarnClass = "Bulky"
    else
        return yarnClass = "Off the charts heavy"

}

function showError(message) {
    const errorDiv = document.createElement('div')
    const card = document.querySelector('.card')
    const heading = document.querySelector('.heading')
    errorDiv.className = 'alert alert-danger'
    errorDiv.appendChild(document.createTextNode(message))
    card.insertBefore(errorDiv, heading)
    setTimeout(clearError, 3000)
}

function clearError() {
    document.querySelector('.alert').remove()
}