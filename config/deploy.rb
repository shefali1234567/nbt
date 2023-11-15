# config valid only for current version of Capistrano
lock "3.9.0"

set :application, "np"
set :repo_url, "git@bitbucket.org:times_internet/np.git"

# Default branch is :master
# ask :branch, `git rev-parse --abbrev-ref HEAD`.chomp

# Default deploy_to directory is /var/www/my_app_name
set :deploy_to, "/var/www/np"

#tmp folder 
set :tmp_dir, "#{deploy_to}/tmp"

# Default value for :format is :airbrussh.
# set :format, :airbrussh

# You can configure the Airbrussh format using :format_options.
# These are the defaults.
# set :format_options, command_output: true, log_file: "log/capistrano.log", color: :auto, truncate: :auto

# Default value for :pty is false
# set :pty, true

# Default value for :linked_files is []
# append :linked_files, "config/database.yml", "config/secrets.yml"

# Default value for linked_dirs is []
# append :linked_dirs, "log", "tmp/pids", "tmp/cache", "tmp/sockets", "public/system"
#set :linked_dirs, %w{node_modules}
#set :copy_files, ['node_modules']
#set :copy_dir_flags, "-R"

# Default value for default_env is {}
# set :default_env, { path: "/opt/ruby/bin:$PATH" }

# Default value for local_user is ENV['USER']
# set :local_user, -> { `git config user.name`.chomp }

# Default value for keep_releases is 5
set :keep_releases, 10

# pm2 configuration

set :pm2_app_command, '-i 0 --name np ./server/index.js -- -r ./server/environment.js'                   # the main program
#set :pm2_app_name, fetch(:application)            # name for pm2 app
#set :pm2_target_path, -> { release_path }         # where to run pm2 commands
#set :pm2_roles, :all                              # server roles where pm2 runs on
#set :pm2_env_variables, '-i 0'                      # default: env vars for pm2
#set :pm2_start_params, ' --name np'



# pm2 restart

namespace :deploy do
      #desc 'Restart application'
      #  task :restart do
      #      invoke 'pm2:restart'
      #        end

        task :build do
            on roles(:app) do
                execute "cd #{release_path};  yarn prod:build"
            end
        end
        task :copy do
            on roles(:app) do
                execute "cp #{release_path}/server/_env #{release_path}/server/.env"
                execute "cp -r #{current_path}/node_modules #{release_path}"
            end
        end

          after :updating, :copy
          after :updated, :build
          after :publishing, :restart
end
