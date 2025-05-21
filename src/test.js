const obj = `{
  "machine_id": "M001",
  "prediction": {
    "days_to_failure": 2,
    "failure_predictions": [
      {
        "action_recommendation": {
          "action": "monitor",
          "recommended_before": null,
          "urgency": "low"
        },
        "bayesian_update": {
          "confidence_change": null,
          "hours_to_failure": null,
          "prior_prediction": null
        },
        "detection": {
          "confidence": "low",
          "detected": false,
          "probability": 0.010999999940395355
        },
        "failure_type": "Bearing Failure"
      },
      {
        "action_recommendation": {
          "action": "monitor",
          "recommended_before": null,
          "urgency": "low"
        },
        "bayesian_update": {
          "confidence_change": null,
          "hours_to_failure": null,
          "prior_prediction": null
        },
        "detection": {
          "confidence": "low",
          "detected": false,
          "probability": 0.02370000071823597
        },
        "failure_type": "Carbon Buildup"
      },
      {
        "action_recommendation": {
          "action": "monitor",
          "recommended_before": null,
          "urgency": "low"
        },
        "bayesian_update": {
          "confidence_change": null,
          "hours_to_failure": null,
          "prior_prediction": null
        },
        "detection": {
          "confidence": "low",
          "detected": false,
          "probability": 0.008999999612569809
        },
        "failure_type": "Electrical Malfunction"
      },
      {
        "action_recommendation": {
          "action": "monitor",
          "recommended_before": null,
          "urgency": "low"
        },
        "bayesian_update": {
          "confidence_change": null,
          "hours_to_failure": null,
          "prior_prediction": null
        },
        "detection": {
          "confidence": "low",
          "detected": false,
          "probability": 0.0020000000949949026
        },
        "failure_type": "Motor Burnout"
      },
      {
        "action_recommendation": {
          "action": "monitor_closely",
          "recommended_before": "2025-05-23 11:06:07.607220",
          "urgency": "medium"
        },
        "bayesian_update": {
          "confidence_change": null,
          "hours_to_failure": null,
          "prior_prediction": null
        },
        "detection": {
          "confidence": "high",
          "detected": true,
          "probability": 0.9478999972343445
        },
        "failure_type": "Normal"
      },
      {
        "action_recommendation": {
          "action": "monitor",
          "recommended_before": null,
          "urgency": "low"
        },
        "bayesian_update": {
          "confidence_change": null,
          "hours_to_failure": null,
          "prior_prediction": null
        },
        "detection": {
          "confidence": "low",
          "detected": false,
          "probability": 0.0012000000569969416
        },
        "failure_type": "Overheating"
      },
      {
        "action_recommendation": {
          "action": "monitor",
          "recommended_before": null,
          "urgency": "low"
        },
        "bayesian_update": {
          "confidence_change": null,
          "hours_to_failure": null,
          "prior_prediction": null
        },
        "detection": {
          "confidence": "low",
          "detected": false,
          "probability": 0.005200000014156103
        },
        "failure_type": "Pressure System Failure"
      }
    ],
    "failure_probability": 0.6607000231742859,
    "machine_id": "M001",
    "prediction_id": null,
    "recommended_action": "monitor_closely",
    "status": "alert",
    "timestamp": "2025-05-21 11:06:07.607220",
    "urgency": "medium"
  },
  "simulation_id": 3,
  "stored_in_database": true
}`;

const jsObj = JSON.parse(obj);

export default jsObj;
