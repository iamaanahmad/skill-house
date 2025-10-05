/**
 * Storage Service
 * Handles file upload and management with Appwrite Storage
 */

import { ID } from 'appwrite';
import { storage } from './client';
import { appwriteConfig } from './config';

export class StorageService {
  /**
   * Upload a file to a bucket
   */
  async uploadFile(
    bucketId: string,
    file: File,
    fileId?: string
  ): Promise<{ fileId: string; url: string }> {
    try {
      const uploadedFile = await storage.createFile(
        bucketId,
        fileId || ID.unique(),
        file
      );

      const fileUrl = this.getFilePreview(bucketId, uploadedFile.$id);

      return {
        fileId: uploadedFile.$id,
        url: fileUrl,
      };
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  }

  /**
   * Upload avatar image
   */
  async uploadAvatar(file: File): Promise<{ fileId: string; url: string }> {
    return this.uploadFile(appwriteConfig.buckets.avatars, file);
  }

  /**
   * Upload evidence file
   */
  async uploadEvidence(file: File): Promise<{ fileId: string; url: string }> {
    return this.uploadFile(appwriteConfig.buckets.evidence, file);
  }

  /**
   * Get file preview/download URL
   */
  getFilePreview(bucketId: string, fileId: string): string {
    try {
      const result = storage.getFilePreview(bucketId, fileId);
      return result.toString();
    } catch (error) {
      console.error('Error getting file preview:', error);
      return '';
    }
  }

  /**
   * Get file download URL
   */
  getFileDownload(bucketId: string, fileId: string): string {
    try {
      const result = storage.getFileDownload(bucketId, fileId);
      return result.toString();
    } catch (error) {
      console.error('Error getting file download:', error);
      return '';
    }
  }

  /**
   * Delete a file
   */
  async deleteFile(bucketId: string, fileId: string): Promise<void> {
    try {
      await storage.deleteFile(bucketId, fileId);
    } catch (error) {
      console.error('Error deleting file:', error);
      throw error;
    }
  }

  /**
   * Get file view URL
   */
  getFileView(bucketId: string, fileId: string): string {
    try {
      const result = storage.getFileView(bucketId, fileId);
      return result.toString();
    } catch (error) {
      console.error('Error getting file view:', error);
      return '';
    }
  }
}

export const storageService = new StorageService();
