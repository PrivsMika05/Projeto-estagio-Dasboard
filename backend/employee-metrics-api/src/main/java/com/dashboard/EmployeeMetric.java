package com.dashboard;

import jakarta.persistence.*;

@Entity
@Table(name = "employee_metrics")
public class EmployeeMetric {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String department;
    private int enps;
    private int satisfactionScore;
    private double retentionRate;
    private double turnoverRate;
    private int onboardingTime;
    private double absenteeismRate;
    private int engagementScore;

    // Getters e Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }

    public int getEnps() { return enps; }
    public void setEnps(int enps) { this.enps = enps; }

    public int getSatisfactionScore() { return satisfactionScore; }
    public void setSatisfactionScore(int satisfactionScore) { this.satisfactionScore = satisfactionScore; }

    public double getRetentionRate() { return retentionRate; }
    public void setRetentionRate(double retentionRate) { this.retentionRate = retentionRate; }

    public double getTurnoverRate() { return turnoverRate; }
    public void setTurnoverRate(double turnoverRate) { this.turnoverRate = turnoverRate; }

    public int getOnboardingTime() { return onboardingTime; }
    public void setOnboardingTime(int onboardingTime) { this.onboardingTime = onboardingTime; }

    public double getAbsenteeismRate() { return absenteeismRate; }
    public void setAbsenteeismRate(double absenteeismRate) { this.absenteeismRate = absenteeismRate; }

    public int getEngagementScore() { return engagementScore; }
    public void setEngagementScore(int engagementScore) { this.engagementScore = engagementScore; }
}
