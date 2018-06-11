package com.teachManage.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFDateUtil;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.util.NumberToTextConverter;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;



public class ExcelReader {
	/**
	 * @描述：根据文件名读取excel文件
	 */
	public List<List<String>> read(String filePath) {
		List<List<String>> dataLst = new ArrayList<List<String>>();
		InputStream is = null;
		try {

			/** 判断文件的类型，是2003还是2007 */
			boolean isExcel2003 = true;
			if (CEVUtil.isExcel2007(filePath)) {
				isExcel2003 = false;
			}
			/** 调用本类提供的根据流读取的方法 */
			is = new FileInputStream(new File(filePath));
			Workbook wb = null;
			if (isExcel2003) {
				wb = new HSSFWorkbook(is);
			} else {
				wb = new XSSFWorkbook(is);
			}
			dataLst = readexcel(wb);
			is.close();
		} catch (IOException e) {
			e.printStackTrace();
		} catch (Exception ex) {
			ex.printStackTrace();
		} finally {
			if (is != null) {
				try {
					is.close();
				} catch (IOException e) {
					is = null;
					e.printStackTrace();
				}
			}
		}
		return dataLst;
	}
	
	public static Workbook getWorkbook(String filePath) throws Exception{
		Workbook wb = null;
		
		/** 判断文件的类型，是2003还是2007 */
		boolean isExcel2003 = true;
		if (CEVUtil.isExcel2007(filePath)) {
			isExcel2003 = false;
		}
		/** 调用本类提供的根据流读取的方法 */
		InputStream is = new FileInputStream(new File(filePath));
		if (isExcel2003) {
			wb = new HSSFWorkbook(is);
		} else {
			wb = new XSSFWorkbook(is);
		}
		
		return wb;
	}
	
	public List<List<String>> readExcel(String filePath) throws Exception{
		List<List<String>> dataLst = new ArrayList<List<String>>();
		InputStream is = null;
		try {

			/** 判断文件的类型，是2003还是2007 */
			boolean isExcel2003 = true;
			if (CEVUtil.isExcel2007(filePath)) {
				isExcel2003 = false;
			}
			/** 调用本类提供的根据流读取的方法 */
			is = new FileInputStream(new File(filePath));
			Workbook wb = null;
			if (isExcel2003) {
				wb = new HSSFWorkbook(is);
			} else {
				wb = new XSSFWorkbook(is);
			}
			dataLst = readexcel(wb);
			is.close();
		} catch (IOException e) {
			throw new IOException(e);
		} catch (Exception ex) {
			throw new Exception(ex);
		} finally {
			if (is != null) {
				try {
					is.close();
				} catch (IOException e) {
					is = null;
					// e.printStackTrace();
					throw new IOException(e);
				}
			}
		}
		return dataLst;
	}
	
	public List<List<String>> readExcel2(String filePath) throws Exception{
		List<List<String>> dataLst = new ArrayList<List<String>>();
		InputStream is = null;
		try {

			/** 判断文件的类型，是2003还是2007 */
			boolean isExcel2003 = true;
			if (CEVUtil.isExcel2007(filePath)) {
				isExcel2003 = false;
			}
			/** 调用本类提供的根据流读取的方法 */
			is = new FileInputStream(new File(filePath));
			Workbook wb = null;
			if (isExcel2003) {
				wb = new HSSFWorkbook(is);
			} else {
				wb = new XSSFWorkbook(is);
			}
			dataLst = readexcel2(wb);
			is.close();
		} catch (IOException e) {
			throw new IOException(e);
		} catch (Exception ex) {
			throw new Exception(ex);
		} finally {
			if (is != null) {
				try {
					is.close();
				} catch (IOException e) {
					is = null;
					// e.printStackTrace();
					throw new IOException(e);
				}
			}
		}
		return dataLst;
	}

	/**
	 * @throws IOException 
	 * @描述：读取数据
	 */
	private List<List<String>> readexcel(Workbook wb) throws IOException {
		
		/** 得到总的shell */
		//int sheetAccount = wb.getNumberOfSheets();
		/** 得到第一个shell */
		Sheet sheet = wb.getSheetAt(0);
		/** 得到Excel的行数 */
		List<List<String>> dataLst = readexcelSheet(sheet);
		
		wb.close();
		return dataLst;
	}
	
	
	private List<List<String>> readexcel2(Workbook wb) throws IOException {
		
		/** 得到总的shell */
		int sheetAccount = wb.getNumberOfSheets();
		if(sheetAccount>=1){
			/** 得到第一个shell */
			Sheet sheet = wb.getSheetAt(1);
			/** 得到Excel的行数 */
			List<List<String>> dataLst = readexcelSheet(sheet);
			
			wb.close();
			return dataLst;
		}
		return null;
	}
	
	
	private List<List<String>> readexcelSheet(Sheet sheet)throws IOException{
		List<List<String>> dataLst = new ArrayList<List<String>>();
		
		int rowCount = sheet.getPhysicalNumberOfRows();
		/** 也可以通过得到最后一行数 */
		//int lastRowNum = sheet.getLastRowNum();
		/** 循环Excel的行 */
		for (int r = 0; r < rowCount; r++) {
			Row row = sheet.getRow(r);
			if (row == null) {
				continue;
			}
			List<String> rowLst = new ArrayList<String>();
			/** 循环Excel的列 */
			for (int c = 0; c < row.getLastCellNum(); c++) {
				Cell cell = row.getCell(c);
				String cellValue = "";
				if (null != cell) {
					// 以下是判断数据的类型
					switch (cell.getCellType()) {
					// XSSFCell可以达到相同的效果
					case HSSFCell.CELL_TYPE_NUMERIC: // 数字
						double d = cell.getNumericCellValue();
						if (HSSFDateUtil.isCellDateFormatted(cell)) {// 日期类型
						// Date date = cell.getDateCellValue();
							Date date = HSSFDateUtil.getJavaDate(d);
							cellValue = new SimpleDateFormat(
									"yyyy-MM-dd HH:mm:ss").format(date);
							//cellValue = cell.getDateCellValue() + "";
						} else {// 数值类型
							
							// 是否为数值型
						    	  DecimalFormat df = new DecimalFormat("#");
						    	  //System.out.println("type666=="+df.format(cell.getNumericCellValue())); 
						    	  cellValue = df.format(cell.getNumericCellValue());
						     
							//cellValue = String.valueOf((int)cell.getNumericCellValue());
						}
					
						break;
					case HSSFCell.CELL_TYPE_STRING: // 字符串
						cellValue = cell.getStringCellValue();
						break;
					case HSSFCell.CELL_TYPE_BOOLEAN: // Boolean
						cellValue = cell.getBooleanCellValue() + "";
						break;
					case HSSFCell.CELL_TYPE_FORMULA: // 公式
						cellValue = cell.getCellFormula() + "";
						break;
					case HSSFCell.CELL_TYPE_BLANK: // 空值
						cellValue = "";
						break;
					case HSSFCell.CELL_TYPE_ERROR: // 故障
						cellValue = "非法字符";
						break;
					default:
						cellValue = "未知类型";
						break;
					}
				}
				//System.out.print(cellValue + "\t");
				rowLst.add(cellValue);
			}
			//System.out.println();
			dataLst.add(rowLst);
		}
		return dataLst;
	}
	
	public List<List<String>> read(InputStream inputStream) {
		List<List<String>> dataLst = new ArrayList<List<String>>();
		InputStream is = null;
		try {

			/** 判断文件的类型，是2003还是2007 */
			boolean isExcel2003 = true;
			if (CEVUtil.isExcel2007(inputStream)) {
				isExcel2003 = false;
			}
			/** 调用本类提供的根据流读取的方法 */
			is = inputStream;
			Workbook wb = null;
			if (isExcel2003) {
				wb = new HSSFWorkbook(is);
			} else {
				wb = new XSSFWorkbook(is);
			}
			dataLst = readexcel(wb);
			is.close();
		} catch (IOException e) {
			e.printStackTrace();
		} catch (Exception ex) {
			ex.printStackTrace();
		} finally {
			if (is != null) {
				try {
					is.close();
				} catch (IOException e) {
					is = null;
					e.printStackTrace();
				}
			}
		}
		return dataLst;
	}
	
	public static Object getValue(Cell cell){
		Object obj = null;
		
		if(cell != null){
			switch(cell.getCellType()){
			case HSSFCell.CELL_TYPE_NUMERIC: 
				double d = cell.getNumericCellValue();
				if(HSSFDateUtil.isCellDateFormatted(cell)){
					Date date = HSSFDateUtil.getJavaDate(d);
					obj = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(date);
				} else {
					obj = NumberToTextConverter.toText(d);
				}
				break;
			case HSSFCell.CELL_TYPE_STRING:
				obj = cell.getStringCellValue();
				break;
			case HSSFCell.CELL_TYPE_BOOLEAN:
				obj = cell.getBooleanCellValue();
				break;
			case HSSFCell.CELL_TYPE_FORMULA:
				obj = cell.getCellFormula();
				break;
			case HSSFCell.CELL_TYPE_BLANK:
				obj = "";
				break;
			case HSSFCell.CELL_TYPE_ERROR:
				break;
			default : 
				break;
			}
		}
		
		return obj;
	}
}
