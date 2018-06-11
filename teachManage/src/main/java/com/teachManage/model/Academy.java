package com.teachManage.model;

public class Academy {
    private Integer id;
    
    private String academyId;

    private String academy;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getAcademy() {
        return academy;
    }

    public void setAcademy(String academy) {
        this.academy = academy == null ? null : academy.trim();
    }

	public String getAcademyId() {
		return academyId;
	}

	public void setAcademyId(String academyId) {
		this.academyId = academyId;
	}
    
}