package com.teachManage.util;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.poi.POIXMLDocument;
import org.apache.poi.poifs.filesystem.POIFSFileSystem;

public class CEVUtil {

	private static Log log = LogFactory.getLog(CEVUtil.class);
	
	/**
	 * 依据后缀名判断读取的是否为Excel文件
	 * 
	 * @param filePath
	 * @return
	 */
	public static boolean isExcel(String filePath) {
		if (filePath.matches("^.+\\.(?i)(xls)$")
				|| filePath.matches("^.+\\.(?i)(xlsx)$")) {
			return true;
		}
		return false;
	}

	/**
	 * 检查文件是否存在
	 */
	public static boolean fileExist(String filePath) {
		if (filePath == null || filePath.trim().equals(""))
			return false;
		File file = new File(filePath);
		if (file == null || !file.exists()) {
			return false;
		}
		return true;
	}

	/**
	 * 依据内容判断是否为excel2003及以下
	 */
	public static boolean isExcel2003(String filePath) throws Exception{
		BufferedInputStream bis = null;
		try {
			bis = new BufferedInputStream(new FileInputStream(filePath));
			if (POIFSFileSystem.hasPOIFSHeader(bis)) {
				log.info("Excel文件版本判断: 该Excel文件的版本为excel2003及以下");
				return true;
			}
		} catch (IOException e) {
			e.printStackTrace();
			return false;
		} finally {
			bis.close();
		}
		return false;
	}
	
	public static boolean isExcel2003(InputStream inputStream) throws Exception{
		BufferedInputStream bis = null;
		try {
			bis = new BufferedInputStream(inputStream);
			if (POIFSFileSystem.hasPOIFSHeader(bis)) {
				log.info("Excel文件版本判断: 该Excel文件的版本为excel2003及以下");
				return true;
			}
		} catch (IOException e) {
			e.printStackTrace();
			return false;
		} finally {
			bis.close();
		}
		return false;
	}

	/**
	 * 依据内容判断是否为excel2007及以上
	 */
	public static boolean isExcel2007(String filePath) throws Exception {
		BufferedInputStream bis = null;
		boolean is2007 = false;
		try {
			
			bis = new BufferedInputStream(new FileInputStream(filePath));
			if (POIXMLDocument.hasOOXMLHeader(bis)) {
				log.info("Excel文件的版本判断：该Excel文件的版本为excel2007及以上");
				is2007 = true;
			}
			
		} catch (IOException e) {
			e.printStackTrace();
			is2007 = false;
		} finally{
			bis.close();
		}
		
		return is2007;
	}
	
	public static boolean isExcel2007(InputStream inputStream) throws Exception{
		BufferedInputStream bis = null;
		try {
			bis = new BufferedInputStream(inputStream);
			if (POIXMLDocument.hasOOXMLHeader(bis)) {
				log.info("Excel文件的版本判断：该Excel文件的版本为excel2007及以上");
				return true;
			}
		} catch (IOException e) {
			e.printStackTrace();
			return false;
		} finally {
			bis.close();
		}
		return false;
	}

}
