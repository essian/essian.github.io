document.getElementById('grist-form-metric').style.display = 'none'

// Toggle mixed and metric

document.getElementById('metric-button').addEventListener('click', function(e){
    const mixedWeight = document.getElementById('mixed-weight-g').value
    const mixedWraps = document.getElementById('mixed-wraps').value
    const metricWeight = document.getElementById('metric-weight-g')
    const metricWraps = document.getElementById('metric-wraps')
    reset()
    if (mixedWeight !== null) {
        metricWeight.value = mixedWeight
    }
    if (mixedWraps !== null) {
        metricWraps.value = mixedWraps
    }
    document.getElementById('grist-form-mixed').style.display = "none"
    document.getElementById('grist-form-metric').style.display = 'block'

})

document.getElementById('mixed-button').addEventListener('click', function(e){
    const metricWeight = document.getElementById('metric-weight-g').value
    const metricWraps = document.getElementById('metric-wraps').value
    const mixedWeight = document.getElementById('mixed-weight-g')
    const mixedWraps = document.getElementById('mixed-wraps')
    reset()
    if (metricWeight !== null) {
        mixedWeight.value = metricWeight
    }
    if (metricWraps !== null) {
        mixedWraps.value = metricWraps
    }
    document.getElementById('grist-form-mixed').style.display = "block"
    document.getElementById('grist-form-metric').style.display = 'none'

})

// Calculate Mixed Result

document.getElementById('grist-form-mixed').addEventListener('submit', function (e) {
    document.getElementById('results').style.display = 'none'
    document.getElementById('loading').style.display = 'block'
    setTimeout(calculateResultsMixed, 1000)
    e.preventDefault()
})

// Calculate Metric Result

document.getElementById('grist-form-metric').addEventListener('submit', function (e) {
    document.getElementById('results').style.display = 'none'
    document.getElementById('loading').style.display = 'block'
    setTimeout(calculateResultsMetric, 1000)
    e.preventDefault()
})


// Reset both forms

document.getElementById('reset-button').addEventListener('click', reset) 

function reset() {
    document.getElementById('grist-form-mixed').reset()
    document.getElementById('grist-form-metric').reset()
    document.getElementById('results').style.display = 'none'
}

// Mixed Calculation

function calculateResultsMixed() {
    const weightInGrams = parseFloat(document.getElementById('mixed-weight-g').value)
    const length = parseFloat(document.getElementById('mixed-length-inches').value)
    const wraps = parseFloat(document.getElementById('mixed-wraps').value)
    const gristMetricField = document.getElementById('gristMetric')
    const gristImperialField = document.getElementById('gristImperial')
    const yarnClass = document.getElementById('class')
    const totalLength = document.getElementById('totalLengthYards')
    const totalLengthMeters = document.getElementById('totalLengthMeters')

    const totalLengthInYards = (wraps * 2 * length) / 36
    const totalLengthInMeters = totalLengthInYards / 1.094
    const weightInPounds = weightInGrams / 453.592
    const gristMetric = totalLengthInMeters / (weightInGrams / 1000)
    const gristImperial = totalLengthInYards / weightInPounds

    if (isFinite(gristImperial)) {
        totalLengthYards.value = totalLengthInYards.toFixed(2)
        totalLengthMeters.value = totalLengthInMeters.toFixed(2)
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

// Metric Calculation

function calculateResultsMetric() {
    const weightInGrams = parseFloat(document.getElementById('metric-weight-g').value)
    const length = parseFloat(document.getElementById('metric-length-cm').value)
    const wraps = parseFloat(document.getElementById('metric-wraps').value)
    const gristMetricField = document.getElementById('gristMetric')
    const gristImperialField = document.getElementById('gristImperial')
    const yarnClass = document.getElementById('class')
    const totalLength = document.getElementById('totalLengthYards')
    const totalLengthMeters = document.getElementById('totalLengthMeters')

    const totalLengthInMeters = length * wraps * 2 / 100
    const totalLengthInYards = totalLengthInMeters * 1.094
    
    const weightInPounds = weightInGrams / 453.592
    const gristMetric = totalLengthInMeters / (weightInGrams / 1000)
    const gristImperial = totalLengthInYards / weightInPounds

    if (isFinite(gristImperial)) {
        totalLengthYards.value = totalLengthInYards.toFixed(2)
        totalLengthMeters.value = totalLengthInMeters.toFixed(2)
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