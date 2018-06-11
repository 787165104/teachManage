package com.teachManage.util;

/**
 * Gird view 的数据载体
 * @author New
 * 
 */
public class GridDataEntity<T> {

	private int total; // 总页数
	private int page = 1; // 当前页
	private int records; // 查询出的记录数
	private int pageSize = 10;// 每页记录数
	private int beginResult = 0;// 开始记录数
	private T rows; // 包含实际的数据行

	public GridDataEntity() {

	}

	public GridDataEntity(int total, int page, int records, int pageSize, T rows) {
		super();
		this.total = total;
		this.page = page;
		this.records = records;
		this.rows = rows;
		this.pageSize = pageSize;
	}

	public GridDataEntity(int page, int records, int pageSize, T rows) {
		super();
		this.page = page;
		this.records = records;
		this.rows = rows;
		this.pageSize = pageSize;
		
	}

	/**
	 * 计算总页数
	 */
	private void countPages() {
		if (records == 0) {
			this.total = 1;
		} else {
			this.total = (records / pageSize); // 总共几页
			if ((records % pageSize) != 0)
				this.total = this.total + 1;
		}
	}

	/**
	 * 获得开始记录数
	 *
	 * @return int 开始记录数
	 */
	public int getBeginResult() {

		// 当前页
		// private int currentPageNo = 1;
		// 开始记录数
		// private int beginResult = 0;

		if (total != 1) {
			if (page >= total) {
				page = total;
				beginResult = (page - 1) * pageSize;
				pageSize = records - beginResult;
			} else {
				beginResult = (page - 1) * pageSize;
			}
		}
		if (total == 1) {
			page = total;
			beginResult = 0;
			pageSize = records;

		}
		return beginResult;
	}

	public double getTotal() {
		return total;
	}

	public void setTotal(int total) {
		this.total = total;
	}

	public int getPage() {
		return page;
	}

	public void setPage(int page) {
		this.page = page;
	}

	public double getRecords() {
		return records;
	}

	public void setRecords(int records) {
		this.records = records;
		countPages();
	}

	public T getRows() {
		return rows;
	}

	public void setRows(T rows) {
		this.rows = rows;
	}

	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	public void setBeginResult(int beginResult) {
		this.beginResult = beginResult;
	}
	
	

	
}
