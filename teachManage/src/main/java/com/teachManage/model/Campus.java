package com.teachManage.model;

public class Campus {
    private Integer id;

    private String campusarea;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCampusarea() {
        return campusarea;
    }

    public void setCampusarea(String campusarea) {
        this.campusarea = campusarea == null ? null : campusarea.trim();
    }
}