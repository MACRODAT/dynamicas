import os

def list_files_by_folder(directory):
    """
    This function takes a directory path as input and returns a dictionary where each folder in the 
    directory is a key and its files are the values. Files directly in the root directory will be listed under 'root_files'.
    
    :param directory: Path to the directory (str)
    :return: A dictionary with folders as keys and lists of files as values
    """
    result = {"root_files": []}

    directory = os.getcwd() + "/" + directory
    
    # Check if the directory exists
    if os.path.exists(directory):
        # Iterate over the contents of the directory
        for item in os.listdir(directory):
            item_path = os.path.join(directory, item)
            
            # If it's a directory, create a key and list its files
            if os.path.isdir(item_path):
                result[item] = []
                for sub_item in os.listdir(item_path):
                    sub_item_path = os.path.join(item_path, sub_item)
                    if os.path.isfile(sub_item_path):
                        result[item].append(sub_item)
            
            # If it's a file in the root directory, add it to 'root_files'
            elif os.path.isfile(item_path):
                result["root_files"].append(item)
    else:
        return f"The directory '{directory}' does not exist."

    return result

def list_files_recursively(directory):
    """
    This function takes a directory path as input and returns a dictionary where each folder (including subdirectories)
    is a key, and its files are the values. It traverses all subdirectories recursively.
    
    :param directory: Path to the directory (str)
    :return: A dictionary with folders (and their subdirectories) as keys and lists of files as values
    """
    result = {}

    directory = os.getcwd() + "/" + directory

    # Check if the directory exists
    if os.path.exists(directory):
        # Walk through the directory and its subdirectories
        for root, dirs, files in os.walk(directory):
            # For each directory, get the relative path and its files
            relative_path = os.path.relpath(root, directory)
            if relative_path == '.':  # Root directory case
                result["root"] = files
            else:
                result[relative_path] = files
    else:
        return f"The directory '{directory}' does not exist."

    return result

if __name__ == "__main__":
    # Example usage
    directory = 'user001'  # Provide the path to the "user001" folder here
    print(list_files_by_folder(directory))
