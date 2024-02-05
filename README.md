# file-manager

1. Checkout to branch ```task-2```
2. Start program with in following way:
```bash
npm run start -- --username=your_username
```
3. To finish work pres ```ctrl + c``` or send ```.exit``` in console
### Instruction:

#### Navigation & working directory:

- Go upper from current directory
    ```bash
    up
    ```
- Go to dedicated folder from current directory 
   ```bash
   cd path_to_directory
   ```
    - Print in console list of all files and folders in current directory. 
   ```bash
   ls
   ```
#### Basic operations with files:
*Directories' name must not contain spaces*
- Read file and print it's content in console: 
    ```bash
    cat path_to_file
    ```
- Create empty file in current working directory: 
    ```bash
    add new_file_name
    ```
- Rename file: 
    ```bash
    rn path_to_file new_filename
    ```
- Copy file: 
    ```bash
    cp path_to_file path_to_new_directory
    ```
- Move file : 
    ```bash
    mv path_to_file path_to_new_directory
    ```
- Delete file: 
    ```bash
    rm path_to_file
    ```
#### Operating system info
- Get EOL
    ```bash
    os --EOL
    ```
- Get host machine CPUs info
    ```bash
    os --cpus
    ```
- Get home directory
    ```bash
    os --homedir
    ```
- Get current system username
    ```bash
    os --username
    ```
- Get CPU architecture
    ```bash
    os --architecture
    ```
#### Hash calculation
- Calculate hash for file and print it into console  
    ```bash
    hash path_to_file
    ```
#### Compress and decompress operations
- Compress file
    ```bash
    compress path_to_file path_to_destination
    ```
- Decompress file
    ```bash
    decompress path_to_file path_to_destination
    ```  